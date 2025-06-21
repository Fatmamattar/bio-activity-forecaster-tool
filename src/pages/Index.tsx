
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BackgroundImage from "@/components/BackgroundImage";
import { ArrowRight, Brain, Target, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navigation />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Biological Activity
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Predictor
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced machine learning tool powered by CatBoost and multi-label classification 
              to predict biological activities with precision and confidence.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
              <Link to="/predictor">
                Start Predicting
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">AI-Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Advanced CatBoost classifier with multi-output capabilities for accurate predictions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <CardTitle className="text-white">Multi-Label</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Simultaneous prediction of multiple biological activities with confidence scores
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <CardTitle className="text-white">High Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Optimized with threshold tuning and balanced sampling for superior performance
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <CardTitle className="text-white">Fast Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-center">
                  Real-time predictions with instant confidence scoring and interpretable results
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* About Section */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl text-white text-center mb-4">About This Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-200 text-lg leading-relaxed">
                Our Biological Activity Predictor leverages state-of-the-art machine learning techniques 
                to analyze molecular features and predict potential biological activities. Built with 
                CatBoost gradient boosting and multi-label classification, this tool provides researchers 
                with powerful insights into compound behavior.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Key Features:</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Multi-label biological activity prediction</li>
                    <li>• Confidence scoring for each prediction</li>
                    <li>• Feature importance analysis</li>
                    <li>• Real-time processing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Technical Details:</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• CatBoost gradient boosting algorithm</li>
                    <li>• Threshold optimization for each label</li>
                    <li>• Balanced sampling with RandomOverSampler</li>
                    <li>• F1-score optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
