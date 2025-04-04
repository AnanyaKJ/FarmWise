import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaWater, FaCloudRain, FaThermometerHalf, FaTint } from 'react-icons/fa';

const Irrigation = () => {
  const [averagePrecipitation, setAveragePrecipitation] = useState(null);
  const [irrigationRecommendation, setIrrigationRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Calculate irrigation needs based on precipitation
  const calculateIrrigationNeeds = (precipitation) => {
    // Standard water requirement for crops (mm/day)
    const optimalWaterPerDay = 6; // Average requirement for most crops
    const weeklyOptimal = optimalWaterPerDay * 7; // Weekly need in mm
    
    // Weekly precipitation already in mm
    const actualWater = precipitation * 7;
    
    // Calculate deficit/surplus in mm
    const waterDifference = weeklyOptimal - actualWater;
    
    return {
      recommended: Math.max(0, waterDifference).toFixed(1), // in mm
      status: waterDifference > 0 ? 'increase' : waterDifference < -2 ? 'decrease' : 'maintain',
      deficit: waterDifference.toFixed(1) // in mm
    };
  };

  const fetchData = async (latitude, longitude) => {
    if (!latitude || !longitude) {
      setError('Location not available');
      setLoading(false);
      return;
    }

    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);

      const formatDate = (date) => {
        return date.toISOString().split('T')[0].replace(/-/g, '');
      };

      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      const url = `https://power.larc.nasa.gov/api/temporal/daily/point?start=${formattedStart}&end=${formattedEnd}&latitude=${latitude}&longitude=${longitude}&community=RE&parameters=PRECTOTCORR&format=JSON`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.properties || !data.properties.parameter || !data.properties.parameter.PRECTOTCORR) {
        throw new Error('Invalid data format');
      }
      
      const precipitationData = data.properties.parameter.PRECTOTCORR;
      const validData = Object.values(precipitationData).filter(value => value >= 0);
      const average = validData.reduce((sum, value) => sum + value, 0) / validData.length;

      setAveragePrecipitation(average);
      setIrrigationRecommendation(calculateIrrigationNeeds(average));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchData(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('Geolocation error: ' + err.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen pt-20"
    style={{
      backgroundImage: "url('https://thumbs.dreamstime.com/b/green-leave-spring-nature-background-sunrise-145265714.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}
  >
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 via-lime-900 to-teal-900 bg-clip-text text-transparent">
            Smart Irrigation System
          </h1>
          <p className="text-xl text-black/90">
            Precision water management based on real-time conditions
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400 text-center"
          >
            {error}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
            {/* Main Recommendation Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-blue-600/5 rounded-2xl p-6 border border-white/10 h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaWater className="text-4xl text-blue-500" />
                <h2 className="text-2xl font-semibold text-white">Irrigation Recommendation</h2>
              </div>

              <div className="space-y-6">
                <div className={`p-6 rounded-lg border ${
                  irrigationRecommendation?.status === 'increase' 
                    ? 'bg-blue-500/20 border-blue-500/30' 
                    : irrigationRecommendation?.status === 'decrease'
                    ? 'bg-yellow-500/20 border-yellow-500/30'
                    : 'bg-green-500/20 border-green-500/30'
                }`}>
                  <h3 className="text-xl font-semibold text-blue-200 mb-2">
                    {irrigationRecommendation?.status === 'increase' 
                      ? 'Increase Irrigation'
                      : irrigationRecommendation?.status === 'decrease'
                      ? 'Decrease Irrigation'
                      : 'Maintain Current Irrigation'}
                  </h3>
                  <p className="text-3xl font-bold text-violet-300">
                    {irrigationRecommendation?.recommended} L/m²
                  </p>
                  <p className="text-white/90 mt-2">
                    Recommended additional water per square meter this week
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Details Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-blue-600/5 rounded-2xl p-6 border border-white/10 h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaWater className="text-4xl text-blue-500" />
                <h2 className="text-2xl font-semibold text-white">Today's Watering Guide</h2>
              </div>

              <div className="space-y-6">
                <div className={`p-6 rounded-lg border ${
                  irrigationRecommendation?.status === 'increase' 
                    ? 'bg-blue-500/20 border-blue-500/30' 
                    : irrigationRecommendation?.status === 'decrease'
                    ? 'bg-yellow-500/20 border-yellow-500/30'
                    : 'bg-green-500/20 border-green-500/30'
                }`}>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    {irrigationRecommendation?.status === 'increase' 
                      ? '⚠️ Your crops need more water'
                      : irrigationRecommendation?.status === 'decrease'
                      ? '💧 Reduce watering - soil is wet enough'
                      : '✅ Perfect water level'}
                  </h3>
                  
                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <p className="text-lg text-white/90">
                      {irrigationRecommendation?.status === 'increase' 
                        ? `Add ${irrigationRecommendation?.recommended} liters of water per 10x10 feet area`
                        : irrigationRecommendation?.status === 'decrease'
                        ? "Skip watering today - recent rain was enough"
                        : "Normal watering today"}
                    </p>
                  </div>

                  <div className="space-y-2 text-black/80">
                    <p>
                      {irrigationRecommendation?.status === 'increase' 
                        ? "👉 Best time to water: Early morning or evening"
                        : irrigationRecommendation?.status === 'decrease'
                        ? "👉 Check soil moisture before watering again"
                        : "👉 Continue your regular watering schedule"}
                    </p>
                    <p className="text-sm text-black/80">
                      Based on last week's rainfall and today's weather
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weather Update Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-xl bg-blue-600/5 rounded-2xl p-6 border border-white/10 h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaCloudRain className="text-4xl text-cyan-500" />
                <h2 className="text-2xl font-semibold text-white">Weather Update</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-lg text-white mb-2">Recent Rain</h3>
                  <p className="text-2xl font-bold text-white">
                    {(averagePrecipitation * 7).toFixed(1)} mm
                    <span className="text-sm text-white/60 ml-2">of rain this week</span>
                  </p>
                  <p className="text-sm text-white/60 mt-2">
                    {averagePrecipitation * 7 > 35 // Adjusted thresholds based on typical crop needs
                      ? "Heavy rainfall week - monitor for excess water" 
                      : averagePrecipitation * 7 > 15 
                      ? "Good rainfall week - check soil moisture"
                      : "Low rainfall week - additional irrigation needed"}
                  </p>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-lg text-white mb-2">Soil Condition</h3>
                  <p className="text-xl text-white">
                    {irrigationRecommendation?.deficit > 2 
                      ? "🏜️ Soil is dry - needs water"
                      : irrigationRecommendation?.deficit < -2
                      ? "💧 Soil is wet - good moisture"
                      : "✅ Perfect moisture level"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => fetchData(latitude, longitude)}
                className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-3 hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Update Weather Info
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Irrigation;