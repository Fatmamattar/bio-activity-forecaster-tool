
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";
import { Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Predictor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Based on your top 10 input features from the model
  const inputFeatures = [
    { name: "feature1", label: "Molecular Weight", range: "0-1000", step: 0.1 },
    { name: "feature2", label: "LogP", range: "0-10", step: 0.1 },
    { name: "feature3", label: "Polar Surface Area", range: "0-200", step: 0.1 },
    { name: "feature4", label: "H-Bond Donors", range: "0-20", step: 1 },
    { name: "feature5", label: "H-Bond Acceptors", range: "0-20", step: 1 },
    { name: "feature6", label: "Rotatable Bonds", range: "0-50", step: 1 },
    { name: "feature7", label: "Aromatic Rings", range: "0-10", step: 1 },
    { name: "feature8", label: "Heteroatoms", range: "0-30", step: 1 },
    { name: "feature9", label: "Heavy Atoms", range: "0-100", step: 1 },
    { name: "feature10", label: "Formal Charge", range: "-5-5", step: 1 }
  ];

  const [values, setValues] = useState<Record<string, number>>(
    inputFeatures.reduce((acc, feature) => ({ ...acc, [feature.name]: 0 }), {})
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setValues(prev => ({ ...prev, [name]: numValue }));
  };

  const resetValues = () => {
    setValues(inputFeatures.reduce((acc, feature) => ({ ...acc, [feature.name]: 0 }), {}));
    toast({
      title: "Values Reset",
      description: "All input values have been reset to 0.",
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
                Enter molecular descriptors to predict biological activities with confidence scores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {inputFeatures.map((feature) => (
                  <div key={feature.name} className="space-y-2">
                    <Label htmlFor={feature.name} className="text-white font-medium">
                      {feature.label}
                    </Label>
                    <div className="space-y-1">
                      <Input
                        id={feature.name}
                        type="number"
                        step={feature.step}
                        value={values[feature.name]}
                        onChange={(e) => handleInputChange(feature.name, e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:bg-white/30 focus:border-white/50"
                        placeholder={`Range: ${feature.range}`}
                      />
                      <p className="text-xs text-gray-400">Range: {feature.range}</p>
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
