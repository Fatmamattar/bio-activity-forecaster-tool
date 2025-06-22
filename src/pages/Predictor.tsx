import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";
import { GRADIO_API_URL } from "@/constants";

const inputFeatures = [
  "4a-α-7-α-β-Nepetalactone",
  "Terpinolene",
  "α-Cymene",
  "α-pinene — (α)-pinene",
  "Limonene — (L)imonene",
  "Caryophyllene (SH)",
  "Hexacosane",
  "(E)-Methyl Cinnamate",
  "1-methyl ethyl hexadecanoate",
  "d,l-trans-4-methyl-5-methoxy-1-(1-methoxy-1-isopropyl)-cyclohex-3-ene"
];

const Predictor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [values, setValues] = useState<Record<string, number>>(
    inputFeatures.reduce((acc, feature) => ({ ...acc, [feature]: 0 }), {})
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSliderChange = (name: string, value: number[]) => {
    setValues(prev => ({ ...prev, [name]: value[0] }));
  };

  const resetValues = () => {
    setValues(inputFeatures.reduce((acc, feature) => ({ ...acc, [feature]: 0 }), {}));
    toast({ title: "Values Reset", description: "All input values have been cleared." });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Gather values in the correct order as required by Gradio
      const inputArray = inputFeatures.map(name => values[name]);
      const response = await fetch(GRADIO_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: inputArray })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const modelOutput = await response.json();

      // Gradio returns { data: [result] }, where result is the model output text
      sessionStorage.setItem(
        "predictionResults",
        JSON.stringify({
          inputs: values,
          predictions: modelOutput.data?.[0] ?? "",
          timestamp: Date.now()
        })
      );
      navigate("/results");
    } catch (error: any) {
      toast({ title: "Prediction failed", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navigation />
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white">Biological Activity Predictor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {inputFeatures.map(feature => (
                <div key={feature} className="flex justify-between items-center">
                  <span className="text-gray-200">{feature}</span>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={values[feature]}
                    onChange={e => handleSliderChange(feature, [parseFloat(e.target.value)])}
                    className="mx-4 w-48"
                  />
                  <span className="text-gray-400">{values[feature]}</span>
                </div>
              ))}
              <div className="flex justify-end space-x-4">
                <Button onClick={resetValues} variant="outline" disabled={isLoading}>
                  Reset
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Predicting..." : "Predict"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
