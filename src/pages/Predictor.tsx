
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";
import { COLAB_MODEL_URL } from "@/constants";

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
      // Prepare features array in the correct order
      const featuresArray = inputFeatures.map(name => values[name]);
      
      console.log("Sending prediction request to Colab model...", featuresArray);
      
      const response = await fetch(COLAB_MODEL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: featuresArray
        })
      });

      if (!response.ok) {
        throw new Error(`Model server error: ${response.status} ${response.statusText}`);
      }
      
      const modelOutput = await response.json();
      console.log("Received model response:", modelOutput);

      if (modelOutput.status === "error") {
        throw new Error(modelOutput.error || "Model prediction failed");
      }

      // Store results for the Results page
      sessionStorage.setItem(
        "predictionResults",
        JSON.stringify({
          inputs: values,
          predictions: modelOutput.prediction || modelOutput,
          timestamp: Date.now(),
          modelSource: "Google Colab"
        })
      );
      
      toast({ 
        title: "Prediction Complete", 
        description: "Model prediction successful! Redirecting to results..." 
      });
      
      navigate("/results");
    } catch (error: any) {
      console.error("Prediction error:", error);
      toast({ 
        title: "Prediction Failed", 
        description: `Error: ${error.message}. Make sure your Colab model is running and accessible.`,
        variant: "destructive"
      });
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
              <p className="text-gray-300 text-sm mt-2">
                Connected to your Google Colab model
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {inputFeatures.map(feature => (
                <div key={feature} className="flex justify-between items-center">
                  <span className="text-gray-200 text-sm">{feature}</span>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.1}
                    value={values[feature]}
                    onChange={e => handleSliderChange(feature, [parseFloat(e.target.value)])}
                    className="mx-4 w-48"
                  />
                  <span className="text-gray-400 min-w-[3rem] text-right">{values[feature].toFixed(1)}</span>
                </div>
              ))}
              <div className="flex justify-end space-x-4 pt-4">
                <Button onClick={resetValues} variant="outline" disabled={isLoading}>
                  Reset
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  {isLoading ? "Predicting..." : "Predict with Colab Model"}
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
