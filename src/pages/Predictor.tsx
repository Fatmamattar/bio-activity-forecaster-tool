
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";
import { Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Predictor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Exact parameters from your original Colab code
  const inputFeatures = [
    { name: "MaxEStateIndex", label: "MaxEStateIndex", min: 0, max: 20, step: 0.1 },
    { name: "MinEStateIndex", label: "MinEStateIndex", min: -10, max: 5, step: 0.1 },
    { name: "MaxAbsEStateIndex", label: "MaxAbsEStateIndex", min: 0, max: 20, step: 0.1 },
    { name: "MinAbsEStateIndex", label: "MinAbsEStateIndex", min: 0, max: 15, step: 0.1 },
    { name: "qed", label: "qed", min: 0, max: 1, step: 0.01 },
    { name: "MolWt", label: "MolWt", min: 0, max: 1000, step: 1 },
    { name: "HeavyAtomMolWt", label: "HeavyAtomMolWt", min: 0, max: 1000, step: 1 },
    { name: "ExactMolWt", label: "ExactMolWt", min: 0, max: 1000, step: 0.1 },
    { name: "NumValenceElectrons", label: "NumValenceElectrons", min: 0, max: 200, step: 1 },
    { name: "NumRadicalElectrons", label: "NumRadicalElectrons", min: 0, max: 10, step: 1 }
  ];

  const [values, setValues] = useState<Record<string, number>>(
    inputFeatures.reduce((acc, feature) => ({ ...acc, [feature.name]: feature.min }), {})
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSliderChange = (name: string, value: number[]) => {
    setValues(prev => ({ ...prev, [name]: value[0] }));
  };

  const resetValues = () => {
    setValues(inputFeatures.reduce((acc, feature) => ({ ...acc, [feature.name]: feature.min }), {}));
    toast({
      title: "Values Reset",
      description: "All input values have been reset to minimum values.",
    });
  };

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simulate prediction API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store prediction data in sessionStorage for the results page
    const predictionData = {
      inputs: values,
      timestamp: new Date().toISOString(),
      // Mock prediction results - in real implementation, this would come from your model
      predictions: [
        { label: "Antimicrobial", confidence: 87.5 },
        { label: "Antioxidant", confidence: 72.3 },
        { label: "Anti-inflammatory", confidence: 65.8 },
        { label: "Cytotoxic", confidence: 45.2 },
        { label: "Antiviral", confidence: 32.1 }
      ].filter(p => p.confidence > 30) // Only show predictions above 30% confidence
    };
    
    sessionStorage.setItem('predictionResults', JSON.stringify(predictionData));
    
    setIsLoading(false);
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
              <CardTitle className="text-3xl text-white mb-2">Biological Activity Predictor</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Adjust molecular descriptors using sliders to predict biological activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {inputFeatures.map((feature) => (
                  <div key={feature.name} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={feature.name} className="text-white font-medium">
                        {feature.label}
                      </Label>
                      <span className="text-white bg-white/20 px-2 py-1 rounded text-sm">
                        {values[feature.name].toFixed(feature.step < 1 ? 2 : 0)}
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
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={handlePredict}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg rounded-full shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Predicting...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Predict Activities
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetValues}
                  variant="outline"
                  className="flex-1 sm:flex-none border-white/30 text-white hover:bg-white/20 py-6 text-lg rounded-full"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
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
