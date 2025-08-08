import React from 'react';
import CertificateEditor from '../components/CertificateEditor';

function GenerateCertificate() {
  const [certificate, showCertificate] = React.useState(false);
  const [inputs, setInputs] = React.useState([{ id: 1, field: "", value: "" }]);

  const addInput = () => {
    setInputs((prev) => [...prev, { id: prev.length + 1, field: "", value: "" }]);
  };

  const updateInput = (id, key, newValue) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, [key]: newValue } : input
      )
    );
  };

  const generateCertificate = () => {
    showCertificate(true);
  };

  const manualText = {
    text: "",
    x: 300,
    y: 450,
    fontSize: 32,
    fill: "white",
    width: 400,
    height: 150,
  };

  return (
    <>
      {certificate ? (
        <CertificateEditor
          predefinedText={manualText}
          inputs={inputs}
        />
      ) : (
        <div className='min-h-screen flex justify-center items-center gap-5 flex-col'>
          <div className='flex flex-col gap-3'>
            {inputs.map((input) => (
              <div key={input.id} className="flex gap-2">
                <div>
                  <label className='block'>Field:</label>
                  <input
                    className='border p-3'
                    value={input.field}
                    onChange={(e) => updateInput(input.id, "field", e.target.value)}
                    placeholder="Enter field name"
                  />
                </div>
                <div>
                  <label className=' block'>Value:</label>
                  <input
                    className='border p-3'
                    value={input.value}
                    onChange={(e) => updateInput(input.id, "value", e.target.value)}
                    placeholder="Enter field value"
                  />
                </div>
              </div>
            ))}
            <button
              className="bg-gray-500 px-3 py-1 rounded"
              onClick={addInput}
            >
              Add Field
            </button>
          </div>
          <div>
            <button
              className='bg-red-500 px-5 py-2 rounded-lg'
              onClick={generateCertificate}
            >
              Generate
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default GenerateCertificate;
