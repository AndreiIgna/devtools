import React, { useState, useEffect } from 'react';

export default function AppJson(props) {
  const [json, setJson] = useState();

  useEffect(() => {
    console.log('focusing')
    document.getElementById('json-input').focus()
  }, []);

  function updateJson(event) {
    const {value} = event.target
    console.log(value)

    try {
      const parsedJson = JSON.parse(value)
      setJson(JSON.stringify(parsedJson, null, 4))
    } catch (error) {
      setJson(`Invalid JSON data (${error.message})`)
    }
  }

  return (
    <main className="">
      <h2 className="text-xl font-bold mb-2">JSON Formatter</h2>
      <p className="text-lg mb-3">Validate and format JSON data</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <textarea id="json-input" className="min-h-min w-full rounded border-slate-300" placeholder="Paste JSON content here" onChange={updateJson}></textarea>
        </div>
        <div className="">
          <div className="w-full overflow-auto bg-slate-100 rounded p-2">
            <pre className="min-h-min">{json}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}
