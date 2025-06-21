
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Predictor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Exact features from your Gradio interface
  const inputFeatures = [
    { name: "4a-α-7-α-β-Nepetalactone", label: "4a-α-7-α-β-Nepetalactone", min: 0, max: 10, step: 0.1 },
    { name: "Terpinolene", label: "Terpinolene", min: 0, max: 10, step: 0.1 },
    { name: "α-Cymene", label: "α-Cymene", min: 0, max: 10, step: 0.1 },
    { name: "α-pinene — (α)-pinene", label: "α-pinene — (α)-pinene", min: 0, max: 10, step: 0.1 },
    { name: "Limonene — (L)imonene", label: "Limonene — (L)imonene", min: 0, max: 10, step: 0.1 },
    { name: "Caryophyllene (SH)", label: "Caryophyllene (SH)", min: 0, max: 10, step: 0.1 },
    { name: "Hexacosane", label: "Hexacosane", min: 0, max: 10, step: 0.1 },
    { name: "(E)-Methyl Cinnamate", label: "(E)-Methyl Cinnamate", min: 0, max: 10, step: 0.1 },
    { name: "1-methyl ethyl hexadecanoate", label: "1-methyl ethyl hexadecanoate", min: 0, max: 10, step: 0.1 },
    { name: "d,l-trans-4-methyl-5-methoxy-1-(1-methoxy-1-isopropyl)-cyclohex-3-ene", label: "d,l-trans-4-methyl-5-methoxy-1-(1-methoxy-1-isopropyl)-cyclohex-3-ene", min: 0, max: 10, step: 0.1 }
  ];

  const [values, setValues] = useState<Record<string, number>>(
    inputFeatures.reduce((acc, feature) => ({ ...acc, [feature.name]: 0 }), {})
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSliderChange = (name: string, value: number[]) => {
    setValues(prev => ({ ...prev, [name]: value[0] }));
  };

  const resetValues = () => {
    setValues(inputFeatures.reduce((acc, feature) => ({ ...acc, [feature.name]: 0 }), {}));
    toast({
      title: "Values Reset",
      description: "All input values have been cleared.",
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate prediction API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction results based on your Gradio interface output
    const mockPredictions = [
      { label: "insecticidal", confidence: 63.21 },
      { label: "antioxidant", confidence: 60.86 },
      { label: "antimicrobial", confidence: 54.11 },
      { label: "antifungal", confidence: 51.17 },
      { label: "anti-inflammatory", confidence: 48.36 },
      { label: "antibacterial", confidence: 46.05 },
      { label: "antitumor", confidence: 17.36 }
    ];
    
    // Store data for Results page
    const predictionData = {
      inputs: values,
      timestamp: new Date().toISOString(),
      predictions: mockPredictions
    };
    
    sessionStorage.setItem('predictionResults', JSON.stringify(predictionData));
    
    setIsLoading(false);
    
    toast({
      title: "Prediction Complete",
      description: "Redirecting to results page...",
    });
    
    // Navigate to results page
    navigate('/results');
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navigation />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">Biological Activity Predictor with Confidence</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Adjust chemical compound concentrations using sliders to predict biological activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {inputFeatures.map((feature) => (
                  <div key={feature.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={feature.name} className="text-white font-medium text-sm">
                        {feature.label}
                      </Label>
                      <span className="text-white bg-white/20 px-2 py-1 rounded text-sm min-w-[60px] text-center">
                        {values[feature.name].toFixed(1)}
                      </span>
                    </div>
                    <Slider
                      id={feature.name}
                      min={feature.min}
                      max={feature.max}
                      step={feature.step}
                      value={[values[feature.name]]}
                      onValueChange={(value) => handleSliderChange(feature.name, value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{feature.min}</span>
                      <span>{feature.max}</span>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={resetValues}
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/20 py-3 text-base rounded-lg"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 text-lg font-semibold rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
