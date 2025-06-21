
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";
import { ArrowLeft, Download, Share2, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PredictionResult {
  label: string;
  confidence: number;
}

interface PredictionData {
  inputs: Record<string, number>;
  timestamp: string;
  predictions: PredictionResult[];
}

const Results = () => {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('predictionResults');
    if (storedData) {
      setPredictionData(JSON.parse(storedData));
    }
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-400";
    if (confidence >= 60) return "text-yellow-400";
    if (confidence >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 80) return { variant: "default" as const, label: "High", icon: CheckCircle };
    if (confidence >= 60) return { variant: "secondary" as const, label: "Medium", icon: TrendingUp };
    return { variant: "outline" as const, label: "Low", icon: AlertCircle };
  };

  if (!predictionData) {
    return (
      <div className="min-h-screen relative">
        <BackgroundImage />
        <Navigation />
        <div className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-md mx-auto">
              <CardContent className="pt-6">
                <p className="text-white text-lg mb-4">No prediction data found.</p>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link to="/predictor">Make a Prediction</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navigation />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Prediction Results
            </h1>
            <p className="text-gray-300 text-lg">
              Analysis completed on {new Date(predictionData.timestamp).toLocaleString()}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
                    Predicted Activities
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Biological activities ranked by confidence score
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {predictionData.predictions.map((prediction, index) => {
                    const badge = getConfidenceBadge(prediction.confidence);
                    const IconComponent = badge.icon;
                    
                    return (
                      <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-white">
                              {prediction.label}
                            </h3>
                            <Badge variant={badge.variant} className="flex items-center space-x-1">
                              <IconComponent className="w-3 h-3" />
                              <span>{badge.label}</span>
                            </Badge>
                          </div>
                          <span className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                            {prediction.confidence}%
                          </span>
                        </div>
                        <div className="space-y-2">
                          <Progress 
                            value={prediction.confidence} 
                            className="h-3 bg-white/20"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Confidence Level</span>
                            <span>
                              {prediction.confidence >= 80 ? "Very High" : 
                               prediction.confidence >= 60 ? "High" : 
                               prediction.confidence >= 40 ? "Moderate" : "Low"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Result Interpretation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                      <h4 className="font-semibold text-green-300 mb-2">High Confidence (≥80%)</h4>
                      <p className="text-sm text-gray-300">
                        Strong likelihood of biological activity. Recommended for further investigation.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                      <h4 className="font-semibold text-yellow-300 mb-2">Medium Confidence (60-79%)</h4>
                      <p className="text-sm text-gray-300">
                        Moderate likelihood. Consider additional validation studies.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-500/20 border border-orange-500/30">
                      <h4 className="font-semibold text-orange-300 mb-2">Low Confidence (40-59%)</h4>
                      <p className="text-sm text-gray-300">
                        Possible activity detected. Requires experimental confirmation.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                      <h4 className="font-semibold text-red-300 mb-2">Very Low (&lt;40%)</h4>
                      <p className="text-sm text-gray-300">
                        Minimal likelihood of activity. Not typically shown in results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    asChild
                  >
                    <Link to="/predictor">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      New Prediction
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/20">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Input Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {Object.entries(predictionData.inputs).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-gray-300">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Model Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-300">
                  <div className="space-y-2">
                    <p><span className="text-white font-medium">Algorithm:</span> CatBoost Multi-Output</p>
                    <p><span className="text-white font-medium">Version:</span> 1.0.0</p>
                    <p><span className="text-white font-medium">Accuracy:</span> 85.2%</p>
                    <p><span className="text-white font-medium">F1-Score:</span> 0.84</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
