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
  }, []);

  if (!results) return null;

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navigation />
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white">Prediction Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-200 text-sm">
                <strong>Timestamp:</strong> {new Date(results.timestamp).toLocaleString()}
              </div>

              <div className="text-gray-300">
                <h3 className="text-xl font-semibold text-white mb-2">Model Output:</h3>
                <pre className="bg-black/40 p-4 rounded-md text-sm text-green-300 overflow-x-auto">
                  {JSON.stringify(results.predictions, null, 2)}
                </pre>
              </div>

              <Button
                className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                onClick={() => navigate("/predictor")}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
