
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";

const Results = () => {
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("predictionResults");
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      navigate("/predictor");
    }
  }, [navigate]);

  if (!results) return null;

  const formatPrediction = (prediction: any): string => {
    if (typeof prediction === 'string') {
      return prediction;
    } else if (Array.isArray(prediction)) {
      return JSON.stringify(prediction, null, 2);
    } else if (typeof prediction === 'object') {
      return JSON.stringify(prediction, null, 2);
    }
    return String(prediction);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navigation />
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white">Prediction Results</CardTitle>
              <p className="text-gray-300 text-sm">
                {results.modelSource && `Source: ${results.modelSource}`}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-gray-200 text-sm">
                <strong>Timestamp:</strong> {results.timestamp ? new Date(results.timestamp).toLocaleString() : ''}
              </div>
              
              <div className="text-gray-300">
                <h3 className="text-xl font-semibold text-white mb-4">Model Prediction:</h3>
                <div className="bg-black/40 p-4 rounded-md">
                  <pre className="text-green-300 text-sm overflow-x-auto whitespace-pre-wrap">
                    {formatPrediction(results.predictions)}
                  </pre>
                </div>
              </div>

              <div className="text-gray-300">
                <h3 className="text-lg font-semibold text-white mb-2">Input Values Used:</h3>
                <div className="bg-black/20 p-4 rounded-md max-h-48 overflow-y-auto">
                  {Object.entries(results.inputs || {}).map(([feature, value]) => (
                    <div key={feature} className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{feature}:</span>
                      <span className="text-blue-300">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  onClick={() => navigate("/predictor")}
                >
                  Try Another Prediction
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
