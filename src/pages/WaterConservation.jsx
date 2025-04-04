import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  FaTint, 
  FaLeaf, 
  FaCloudRain, 
  FaTemperatureLow, 
  FaMountain, 
  FaRecycle 
} from 'react-icons/fa';

const WaterConservation = () => {
  const [selectedTip, setSelectedTip] = useState(null);

  const conservationTips = [
    {
      icon: FaTint,
      title: 'Smart Irrigation',
      description: 'Use drip irrigation and smart controllers to optimize water usage in your fields.',
      color: 'blue',
      details: {
        imageUrl: 'https://www.hydropoint.com/wp-content/uploads/Blog_1090_727._IOT-1024x683.jpg', // Change the URL if you are not satisfied
        steps: [
          '1. Install drip irrigation systems in your field.',
          '2. Use smart controllers to regulate water flow based on real-time weather conditions.',
          '3. Use sensors to measure soil moisture levels and adjust irrigation accordingly.',
          '4. Regularly monitor and maintain the system for optimal efficiency.',
          '5. Integrate with weather forecasting systems for better water management.',
        ],
        impacts: [
          'Reduces water wastage significantly.',
          'Improves crop yield and soil health.',
          'Conserves water for other agricultural needs.',
          'Increases long-term agricultural productivity.',
          'Reduces the cost of irrigation operations.',
        ],
        success: 'Implemented in parts of Israel, Australia, and California, with significant improvements in water usage efficiency.'
      }
    },
    {
      icon: FaLeaf,
      title: 'Mulching',
      description: 'Apply organic mulch to reduce water evaporation and maintain soil moisture.',
      color: 'green',
      details: {
        imageUrl: 'https://pooshanplastic.com/en/wp-content/uploads/2021/05/Mulch-Film-600x600.jpg', 
        steps: [
          '1. Select organic mulch materials such as straw, leaves, or wood chips.',
          '2. Apply a thick layer of mulch around plants to cover the soil.',
          '3. Ensure that the mulch does not touch the plant stems.',
          '4. Replenish the mulch periodically to maintain its effectiveness.',
          '5. Ensure proper moisture retention by checking the mulch regularly.',
        ],
        impacts: [
          'Reduces evaporation of water from the soil.',
          'Helps retain moisture in the root zone.',
          'Improves soil fertility and structure.',
          'Regulates soil temperature for plant roots.',
          'Prevents the growth of weeds that compete for water.'
        ],
        success: 'Widely used in India and Africa, particularly in regions with hot climates.'
      }
    },
    {
      icon: FaCloudRain,
      title: 'Rainwater Harvesting',
      description: 'Implement rainwater collection systems to store water for dry periods.',
      color: 'purple',
      details: {
        imageUrl: 'https://imgk.timesnownews.com/story/rainwater_harvesting_system.jpg', // Change the URL if you are not satisfied
        steps: [
          '1. Install rainwater collection tanks or reservoirs at strategic points.',
          '2. Use filters to remove debris and contaminants from the rainwater.',
          '3. Set up an irrigation system connected to the storage tanks.',
          '4. Ensure regular cleaning and maintenance of collection systems.',
          '5. Reuse stored water during dry periods to reduce dependence on other water sources.',
        ],
        impacts: [
          'Reduces dependence on groundwater or municipal water.',
          'Improves water availability during dry periods.',
          'Helps reduce water bills for farmers.',
          'Promotes sustainable water use in agriculture.',
          'Supports irrigation during periods of water scarcity.'
        ],
        success: 'Successfully implemented in cities like Bangalore, India, and Cape Town, South Africa.'
      }
    },
    {
      icon: FaTemperatureLow,
      title: 'Drought-Resistant Crops',
      description: 'Plant crops that require less water and can withstand dry conditions.',
      color: 'blue',
      details: {
        imageUrl: 'https://i.pinimg.com/originals/d4/f6/f9/d4f6f956ee5220c4ccdc2f44f6bc37a2.jpg', // Change the URL if you are not satisfied
        steps: [
          '1. Research and select drought-resistant crop varieties suitable for your region.',
          '2. Choose crops that are naturally adapted to dry conditions.',
          '3. Plant crops during the dry season to reduce water requirements.',
          '4. Maintain proper soil health to support the growth of these crops.',
          '5. Use appropriate irrigation techniques to minimize water usage.'
        ],
        impacts: [
          'Reduces overall water usage in agriculture.',
          'Helps farmers withstand drought conditions.',
          'Contributes to long-term food security.',
          'Reduces the risk of crop failure during dry periods.',
          'Minimizes the need for supplemental irrigation.'
        ],
        success: 'Implemented in drought-prone regions of India and parts of Africa.'
      }
    },
    {
      icon: FaMountain,
      title: 'Terrain Management',
      description: 'Implement contour farming and terracing to prevent water runoff.',
      color: 'purple',
      details: {
        imageUrl: 'https://thumbs.dreamstime.com/b/pattern-step-cultivation-being-adopted-sloped-mountainous-region-uttarakhand-india-pattern-step-cultivation-being-262200379.jpg', // Change the URL if you are not satisfied
        steps: [
          '1. Identify areas prone to soil erosion and water runoff.',
          '2. Implement contour plowing to follow the natural topography of the land.',
          '3. Build terraces or steps along hilly or sloped terrains to control water movement.',
          '4. Use ground cover plants to stabilize the soil and prevent erosion.',
          '5. Regularly maintain terraces and check for signs of erosion.'
        ],
        impacts: [
          'Prevents soil erosion and water runoff.',
          'Improves water absorption in the soil.',
          'Helps maintain moisture levels in the field.',
          'Reduces the need for chemical fertilizers by improving soil fertility.',
          'Enhances soil structure and health over time.'
        ],
        success: 'Widely implemented in hilly regions of Nepal, Ethiopia, and the Andes mountains.'
      }
    },
    {
      icon: FaRecycle,
      title: 'Water Recycling',
      description: 'Reuse treated agricultural water for non-food crops.',
      color: 'blue',
      details: {
        imageUrl: 'https://storage.googleapis.com/proudcity/goshenma/uploads/2020/06/Recycle-Reduse-Reuse.jpg', // Change the URL if you are not satisfied
        steps: [
          '1. Set up a water treatment facility specifically for agricultural runoff and wastewater.',
          '2. Install filtration systems to remove contaminants from the treated water.',
          '3. Recycle treated water for irrigation of non-food crops like cotton or flowers.',
          '4. Reuse the water for other non-consumable agricultural activities.',
          '5. Ensure regular monitoring of water quality to prevent contamination.'
        ],
        impacts: [
          'Conserves fresh water for drinking and food crops.',
          'Reduces wastewater discharge into the environment.',
          'Promotes sustainable agricultural practices.',
          'Helps meet the growing water demand in agriculture.',
          'Reduces the environmental impact of agricultural water use.'
        ],
        success: 'Used successfully in Israel and parts of the Middle East for non-food crop irrigation.'
      }
    }
  ];

  const handleBoxClick = (index) => {
    setSelectedTip(index);
  };

  const closeDetailBox = () => {
    setSelectedTip(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-16"
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Added semi-transparent overlay
        backgroundImage: "url('https://th.bing.com/th/id/OIP.QntRbxP2KALRRi9b0onL9QHaEK?rs=1&pid=ImgDetMain')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay' // Added for better blending
      }}
    >
      <Navbar customGradient="bg-gradient-to-r from-blue-500 to-purple-500" />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-teal-100 bg-clip-text text-transparent">
            Water Conservation
          </h1>
          <p className="text-xl text-white/90">
            Sustainable practices for efficient water management in agriculture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conservationTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleBoxClick(index)}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 
                         hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center 
                              bg-${tip.color}-500/20`}>
                <tip.icon className={`text-2xl text-${tip.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{tip.title}</h3>
              <p className="text-white/80">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        {selectedTip !== null && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-800/80 p-6 rounded-2xl shadow-lg max-w-6xl w-full relative" // increased max-width
            >
              {/* New styled close button */}
              <button
                onClick={closeDetailBox}
                className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white w-10 h-10 
                           rounded-full flex items-center justify-center text-2xl z-50 
                           border-2 border-white shadow-lg transition-all duration-200 hover:scale-110"
              >
                ×
              </button>
              
              <div className="flex flex-row gap-8"> {/* Changed to horizontal layout */}
                {/* Left side - Image */}
                <div className="w-1/3"> {/* Adjusted width ratio */}
                  <img
                    src={conservationTips[selectedTip].details.imageUrl}
                    alt={conservationTips[selectedTip].title}
                    className="w-full h-[300px] object-cover rounded-xl" // Adjusted height
                  />
                </div>

                {/* Right side - Content */}
                <div className="w-2/3 max-h-[400px] overflow-y-auto pr-4"> {/* Added max height and scroll */}
                  <h2 className="text-2xl font-bold mb-4 text-white">{conservationTips[selectedTip].title}</h2>
                  
                  <div className="grid grid-cols-2 gap-6"> {/* Always two columns */}
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Steps:</h3>
                      <ol className="list-decimal pl-4 text-white text-sm space-y-1">
                        {conservationTips[selectedTip].details.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Impact:</h3>
                      <ul className="list-disc pl-4 text-white text-sm space-y-1">
                        {conservationTips[selectedTip].details.impacts.map((impact, index) => (
                          <li key={index}>{impact}</li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 pt-2 border-t border-white/20">
                        <p className="text-white text-sm">
                          <strong>Success Story:</strong> {conservationTips[selectedTip].details.success}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WaterConservation;
