import React, { useState } from 'react';
import axios from 'axios';
import { SHA256 } from 'crypto-js';

const VerifyCertificate = () => {
  const [verificationMethod, setVerificationMethod] = useState('pdf'); // 'pdf' or 'id'
  const [certificateId, setCertificateId] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyByCertificateId = async () => {
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError('');
    setVerificationResult(null);

    try {
      const response = await axios.get(`/api/certificates/verify/${certificateId}`);
      setVerificationResult({
        valid: true,
        message: 'Certificate verified successfully',
        data: response.data
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setVerificationResult({
          valid: false,
          message: 'Certificate not found'
        });
      } else {
        setError(err.response?.data?.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyByPdf = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setVerificationResult(null);

    try {
      // Calculate PDF hash
      const arrayBuffer = await pdfFile.arrayBuffer();
      const wordArray = SHA256(arrayBuffer.toString());
      const pdfHash = wordArray.toString();

      // Verify with backend
      const response = await axios.post('/api/certificates/verify-by-hash', { hash: pdfHash });
      
      setVerificationResult({
        valid: true,
        message: 'PDF certificate verified successfully',
        data: response.data
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setVerificationResult({
          valid: false,
          message: 'Certificate not found for this PDF'
        });
      } else {
        setError(err.response?.data?.message || 'PDF verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationMethod === 'pdf') {
      verifyByPdf();
    } else {
      verifyByCertificateId();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Certificate</h2>
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                verificationMethod === 'pdf' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setVerificationMethod('pdf')}
            >
              Verify by PDF
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                verificationMethod === 'id' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setVerificationMethod('id')}
            >
              Verify by ID
            </button>
          </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {verificationMethod === 'pdf' ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Certificate PDF
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="pdf-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="pdf-upload"
                        name="pdf-upload"
                        type="file"
                        accept="application/pdf"
                        className="sr-only"
                        onChange={(e) => setPdfFile(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>
              {pdfFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {pdfFile.name}
                </p>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="certificate-id" className="block text-sm font-medium text-gray-700 mb-2">
                Certificate ID
              </label>
              <input
                type="text"
                id="certificate-id"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter certificate ID"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
              />
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Verify Certificate'
            )}
          </button>
        </form>

        {verificationResult && (
          <div className={`mt-6 p-4 rounded-md ${verificationResult.valid ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={verificationResult.valid ? 'text-green-800' : 'text-red-800'}>
              <h3 className="text-lg font-medium mb-2">
                {verificationResult.valid ? '✓ Verification Successful' : '✗ Verification Failed'}
              </h3>
              <p className="mb-2">{verificationResult.message}</p>
              
              {verificationResult.valid && verificationResult.data && (
                <div className="mt-3 border-t pt-3">
                  <h4 className="font-medium">Certificate Details:</h4>
                  <ul className="text-sm space-y-1 mt-1">
                    <li>ID: {verificationResult.data.certificateId}</li>
                    <li>Recipient: {verificationResult.data.recipientName}</li>
                    <li>Issued: {new Date(verificationResult.data.issueDate).toLocaleDateString()}</li>
                    {verificationResult.data.pdfHash && (
                      <li className="truncate">PDF Hash: {verificationResult.data.pdfHash}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
  );
};

export default VerifyCertificate;