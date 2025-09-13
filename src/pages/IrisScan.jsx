import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAnimals } from '../contexts/AnimalContext';
import Webcam from 'react-webcam';
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  Check, 
  X, 
  Eye,
  Loader2,
  Download,
  Save,
  CheckCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const IrisScan = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addAnimal } = useAnimals();
  
  const [mode, setMode] = useState('camera'); // 'camera' or 'upload'
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    
    try {
      // Simulate API call to backend ML model
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate breed-specific mock results
      const breedData = {
        'Holstein Friesian': {
          breed: 'Holstein Friesian',
          confidence: 94.5,
          animalId: `CT${Date.now().toString().slice(-3)}`,
          traits: {
            color: 'Black and White',
            horns: 'No',
            milkType: 'High Yield',
            weight: '450 kg',
            height: '140 cm',
            age: '3-4 years'
          },
          healthStatus: 'Good',
          vaccinationStatus: 'Up to date',
          insuranceStatus: 'Active',
          breeding: {
            optimalMatingTime: '12-18 months',
            recommendedPartner: 'Holstein Friesian Bull',
            breedingShelfLife: '8-10 years',
            fertilityStatus: 'High',
            breedingAge: '18 months'
          },
          health: {
            status: 'Normal',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'Balanced nutrition',
              'Regular health checkups'
            ],
            commonDiseases: [
              'Foot and Mouth Disease',
              'Mastitis',
              'Brucellosis'
            ]
          }
        },
        'Murrah Buffalo': {
          breed: 'Murrah Buffalo',
          confidence: 92.3,
          animalId: `BF${Date.now().toString().slice(-3)}`,
          traits: {
            color: 'Black',
            horns: 'Yes',
            milkType: 'High Fat',
            weight: '550 kg',
            height: '135 cm',
            age: '4-5 years'
          },
          healthStatus: 'Good',
          vaccinationStatus: 'Up to date',
          insuranceStatus: 'Active',
          breeding: {
            optimalMatingTime: '15-20 months',
            recommendedPartner: 'Murrah Buffalo Bull',
            breedingShelfLife: '10-12 years',
            fertilityStatus: 'High',
            breedingAge: '20 months'
          },
          health: {
            status: 'Normal',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'Balanced nutrition with extra minerals',
              'Regular health checkups',
              'Proper shelter from heat'
            ],
            commonDiseases: [
              'Foot and Mouth Disease',
              'Mastitis',
              'Anthrax',
              'Brucellosis'
            ]
          }
        },
        'Jersey': {
          breed: 'Jersey',
          confidence: 89.7,
          animalId: `JR${Date.now().toString().slice(-3)}`,
          traits: {
            color: 'Light Brown',
            horns: 'No',
            milkType: 'High Butterfat',
            weight: '350 kg',
            height: '120 cm',
            age: '3-4 years'
          },
          healthStatus: 'Good',
          vaccinationStatus: 'Up to date',
          insuranceStatus: 'Active',
          breeding: {
            optimalMatingTime: '12-15 months',
            recommendedPartner: 'Jersey Bull',
            breedingShelfLife: '8-10 years',
            fertilityStatus: 'High',
            breedingAge: '15 months'
          },
          health: {
            status: 'Normal',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'High-quality feed',
              'Regular health checkups',
              'Protection from cold weather'
            ],
            commonDiseases: [
              'Foot and Mouth Disease',
              'Mastitis',
              'Brucellosis',
              'Hypocalcemia'
            ]
          }
        },
        'Sahiwal': {
          breed: 'Sahiwal',
          confidence: 91.2,
          animalId: `SW${Date.now().toString().slice(-3)}`,
          traits: {
            color: 'Reddish Brown',
            horns: 'Small',
            milkType: 'Medium Yield',
            weight: '400 kg',
            height: '130 cm',
            age: '3-4 years'
          },
          healthStatus: 'Good',
          vaccinationStatus: 'Up to date',
          insuranceStatus: 'Active',
          breeding: {
            optimalMatingTime: '15-18 months',
            recommendedPartner: 'Sahiwal Bull',
            breedingShelfLife: '10-12 years',
            fertilityStatus: 'High',
            breedingAge: '18 months'
          },
          health: {
            status: 'Normal',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'Heat-resistant shelter',
              'Regular health checkups',
              'Drought-resistant feeding'
            ],
            commonDiseases: [
              'Foot and Mouth Disease',
              'Mastitis',
              'Tick-borne diseases',
              'Heat stress'
            ]
          }
        },
        'Gir': {
          breed: 'Gir',
          confidence: 88.9,
          animalId: `GR${Date.now().toString().slice(-3)}`,
          traits: {
            color: 'White with Red Spots',
            horns: 'Curved',
            milkType: 'High Yield',
            weight: '425 kg',
            height: '135 cm',
            age: '3-4 years'
          },
          healthStatus: 'Good',
          vaccinationStatus: 'Up to date',
          insuranceStatus: 'Active',
          breeding: {
            optimalMatingTime: '15-20 months',
            recommendedPartner: 'Gir Bull',
            breedingShelfLife: '10-12 years',
            fertilityStatus: 'High',
            breedingAge: '18 months'
          },
          health: {
            status: 'Normal',
            preventiveMeasures: [
              'Regular vaccination',
              'Clean water supply',
              'Balanced nutrition',
              'Regular health checkups',
              'Proper grooming'
            ],
            commonDiseases: [
              'Foot and Mouth Disease',
              'Mastitis',
              'Brucellosis',
              'Parasitic infections'
            ]
          }
        }
      };

      // Randomly select a breed for demonstration
      const breeds = Object.keys(breedData);
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      const mockResults = breedData[randomBreed];
      
      setScanResults(mockResults);
      setShowResults(true);
      toast.success('Iris scan completed successfully!');
    } catch (error) {
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const saveAnimal = () => {
    if (!scanResults) return;

    const animalData = {
      breed: scanResults.breed,
      color: scanResults.traits.color,
      horns: scanResults.traits.horns,
      milkType: scanResults.traits.milkType,
      age: scanResults.traits.age,
      owner: 'Current User',
      milkYield: Math.floor(Math.random() * 20) + 15, // Random yield between 15-35L
      image: capturedImage,
      traits: {
        weight: scanResults.traits.weight,
        height: scanResults.traits.height,
        vaccination: scanResults.vaccinationStatus,
        insurance: scanResults.insuranceStatus
      }
    };

    addAnimal(animalData);
    toast.success('Animal saved successfully!');
    navigate('/records');
  };

  const resetScan = () => {
    setCapturedImage(null);
    setScanResults(null);
    setShowResults(false);
    setIsProcessing(false);
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    
    const link = document.createElement('a');
    link.download = `iris-scan-${Date.now()}.png`;
    link.href = capturedImage;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('scan.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Capture or upload an image to identify the animal breed and traits
        </p>
      </div>

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Capture/Upload Section */}
          <div className="card">
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setMode('camera')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  mode === 'camera'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Camera className="h-5 w-5 inline mr-2" />
                Camera
              </button>
              <button
                onClick={() => setMode('upload')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  mode === 'upload'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Upload className="h-5 w-5 inline mr-2" />
                Upload
              </button>
            </div>

            {mode === 'camera' ? (
              <div className="space-y-4">
                <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-64 object-cover"
                  />
                  {capturedImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  {!capturedImage ? (
                    <button
                      onClick={capture}
                      className="flex-1 btn-primary flex items-center justify-center space-x-2"
                    >
                      <Camera className="h-5 w-5" />
                      <span>Capture Image</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={resetScan}
                        className="btn-outline flex items-center space-x-2"
                      >
                        <RotateCcw className="h-5 w-5" />
                        <span>Retake</span>
                      </button>
                      <button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                        <span>{isProcessing ? 'Processing...' : 'Scan Iris'}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors duration-200"
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {capturedImage && (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={capturedImage}
                        alt="Uploaded"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={resetScan}
                        className="btn-outline flex items-center space-x-2"
                      >
                        <X className="h-5 w-5" />
                        <span>Remove</span>
                      </button>
                      <button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                        <span>{isProcessing ? 'Processing...' : 'Scan Image'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              How to Scan
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Position the Animal</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ensure the animal's eye is clearly visible and well-lit
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Capture or Upload</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use the camera to capture or upload a clear image of the animal
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Get Results</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our AI will identify the breed, traits, and generate a unique ID
                  </p>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      Analyzing Image...
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      This may take a few moments
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          {/* Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Captured Image
              </h3>
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Scanned animal"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={downloadImage}
                  className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <Download className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('scan.results')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('scan.breed')}
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {scanResults.breed}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('scan.confidence')}
                  </label>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {scanResults.confidence}%
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('scan.animalId')}
                  </label>
                  <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                    {scanResults.animalId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Traits */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('scan.traits')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(scanResults.traits).map(([key, value]) => (
                <div key={key} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Breeding Information */}
          {scanResults.breeding && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('breeding.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('breeding.matingTime')}
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {scanResults.breeding.optimalMatingTime}
                  </p>
                </div>
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('breeding.matingPartner')}
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {scanResults.breeding.recommendedPartner}
                  </p>
                </div>
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('breeding.shelfLife')}
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {scanResults.breeding.breedingShelfLife}
                  </p>
                </div>
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('breeding.fertilityStatus')}
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {scanResults.breeding.fertilityStatus}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Health Information */}
          {scanResults.health && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('health.title')}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('health.status')}
                  </label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {scanResults.health.status}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {t('health.preventiveMeasures')}
                  </h4>
                  <ul className="space-y-1">
                    {scanResults.health.preventiveMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Common Diseases to Watch For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {scanResults.health.commonDiseases.map((disease, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm">
                        {disease}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetScan}
              className="btn-outline flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Scan Another</span>
            </button>
            
            <button
              onClick={saveAnimal}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>{t('scan.saveAnimal')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IrisScan;
