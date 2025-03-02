import React, { useState } from "react";
import { Sparkles, ArrowRight, Code, Zap } from "lucide-react";
import { uploadResume, AnalysisResult } from './services/api';
import axios from 'axios';

function Hero() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [msg, setMsg] = useState<string>("");
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function handleUpload() {
    if (!file) {
      setMsg("file error upload");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    setMsg("Uploading...");

    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (ProgressEvent) => {
          console.log(ProgressEvent.progress * 100);
        },
        headers: {
          "Custom-header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload Complete");
        console.log(res.data);
      })
      .catch((err) => {
        setMsg("Upload failed");
        console.log(err);
      });
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="tagline">
            <Sparkles className="tagline-icon" />
            <span>AI-Powered Resume Optimization</span>
          </div>
          <h1 className="hero-title">
            Land 2x more interviews with AI-powered resume optimization
          </h1>
          <p className="hero-description">
            Instantly see how your resume scores against any job description and get expert recommendations to increase your chances of getting hired.
          </p>
          <div className="hero-buttons">
            <input
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
              type="file"
            />
            <button className="primary-btn" onClick={handleUpload}>
              <span>
                Try Free Scan
                <ArrowRight className="primary-btn-icon" />
              </span>
            </button>
            <button className="secondary-btn">
              <span>
                Watch Demo
                <Code className="secondary-btn-icon" />
              </span>
            </button>
          </div>
        </div>
        <div className="scan-container">
          <div className="scan-box">
            <label className="scan-label">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="scan-input"
              placeholder="Paste job description here..."
            />
            <label className="scan-label">Resume</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="scan-input"
              placeholder="Paste your resume here or upload a file..."
            />
            <button className="scan-btn">
              <span>
                Scan Now
                <Zap className="scan-btn-icon" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
