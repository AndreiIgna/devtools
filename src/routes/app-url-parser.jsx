import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { parse } from 'tldts';

export default function AppUrlParser(props) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.getElementById('url-input').focus()
  }, []);

  function updateUrl(event) {
    setError(false)
    setUrl(null)
    const {value} = event.target
    console.log(value)

    try {
      const parsedUrl = new URL(value)
      console.log(parsedUrl)
      setUrl(parsedUrl)
    } catch (e) {
      setError(e.message)
    }
  }

  function ParsedUrl(props) {
    if (!url) {
      return null
    }

    const qs = []

    for (const [key, value] of url.searchParams) {
      qs.push({key, value})
    }

    const $qs = qs.map(({ key, value }, index) => {
      return (
        <p key={index} className="px-2 mb-3">
          <code className="px-2 py-1 rounded bg-blue-100">{key}</code> = <code className="px-2 py-1 rounded bg-cyan-100">{value}</code>
        </p>
      )
    })

    const parsedDomain = parse(url.hostname)
    const isValidDomain = parsedDomain.isIcann

    console.log(parsedDomain)

    return (
      <div className="bg-slate-100 border border-slate-200 rounded p-2">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left p-2 border-b border-slate-300 font-medium text-slate-400 min-w-[200px]">Field</th>
              <th className="text-left p-2 border-b border-slate-300 font-medium text-slate-400">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b border-slate-200 text-slate-600">Protocol</td>
              <td className="p-2 border-b border-slate-200 text-slate-600"><code className="px-2 py-1 rounded bg-cyan-100">{url.protocol}</code></td>
            </tr>
            <tr>
              <td className="p-2 border-b border-slate-200 text-slate-600">Auth</td>
              <td className="p-2 border-b border-slate-200 text-slate-600"><code className={classNames('px-2 py-1 rounded', url.username || url.password ? 'bg-cyan-100' : 'bg-gray-200')}>{url.username}:{url.password}</code></td>
            </tr>
            <tr>
              <td className="p-2 border-b border-slate-200 text-slate-600">Hostname</td>
              <td className="p-2 border-b border-slate-200 text-slate-600">
                <code className={classNames('px-2 py-1 rounded', isValidDomain ? 'bg-cyan-100' : 'bg-pink-100')}>{url.hostname}</code>
                {!isValidDomain && <span className="ml-2">⚠️ <strong>{parsedDomain.publicSuffix}</strong> is not a <a href="https://www.icann.org/resources/pages/tlds-2012-02-25-en" target="_blank" rel="noreferrer">valid top-level domain</a></span>}
              </td>
            </tr>
            <tr>
              <td className="p-2 border-b border-slate-200 text-slate-600">Port</td>
              <td className="p-2 border-b border-slate-200 text-slate-600"><code className={classNames('px-2 py-1 rounded', url.port ? 'bg-cyan-100' : 'bg-gray-200')}>{url.port}</code></td>
            </tr>
            <tr>
              <td className="p-2 border-b border-slate-200 text-slate-600">Pathname</td>
              <td className="p-2 border-b border-slate-200 text-slate-600"><code className="px-2 py-1 rounded bg-cyan-100">{url.pathname}</code></td>
            </tr>
            <tr>
              <td className="p-2 border-b border-slate-200 text-slate-600 align-top">Query string</td>
              <td className="p-2 border-b border-slate-200 text-slate-600">{$qs}</td>
            </tr>
            <tr>
              <td className="p-2 border-b border-slate-200 text-slate-600">Hash</td>
              <td className="p-2 border-b border-slate-200 text-slate-600"><code className={classNames('px-2 py-1 rounded', url.hash ? 'bg-cyan-100' : 'bg-gray-200')}>{url.hash}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <main className="">
      <h2 className="text-xl font-bold mb-2">URL Parser</h2>
      <p className="text-lg mb-3">Validate and parse an URL</p>

      <textarea id="url-input" className="w-full rounded border-slate-300" rows="5" placeholder="Paste any URL here" onChange={updateUrl}></textarea>

      <ParsedUrl />

      {error && <div className="px-3 py-2 rounded bg-red-100">⚠️ {error}</div>}
    </main>
  );
}
