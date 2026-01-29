import { CheckCircle, Shield, Zap, FileText, Code2, Download, Chrome, Settings, MousePointer } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900">FormFill Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">How it Works</a>
            <a href="#install" className="text-slate-600 hover:text-slate-900 transition-colors">Install</a>
          </nav>
          <a
            href="#install"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Extension
          </a>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              100% Privacy-First - All Data Generated Locally
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Fill Forms Instantly with
              <span className="text-blue-600"> Realistic Fake Data</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              The privacy-first browser extension for QA engineers and developers.
              Generate realistic test data and fill any web form in seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#install"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <Download className="w-5 h-5" />
                Install Extension
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg border border-slate-200 transition-all hover:shadow-md"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-slate-400 text-sm">example-signup.com</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-slate-400 text-sm">Full Name</label>
                    <div className="bg-slate-800 rounded-lg px-4 py-3 text-white border border-slate-700">
                      James Anderson
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-400 text-sm">Email Address</label>
                    <div className="bg-slate-800 rounded-lg px-4 py-3 text-white border border-slate-700">
                      james.anderson@gmail.com
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-400 text-sm">Phone Number</label>
                    <div className="bg-slate-800 rounded-lg px-4 py-3 text-white border border-slate-700">
                      (555) 234-5678
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-400 text-sm">Password</label>
                    <div className="bg-slate-800 rounded-lg px-4 py-3 text-white border border-slate-700">
                      Kd8#mPq2xLnR
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white text-lg font-medium mb-2">One Click Fill</p>
                  <p className="text-slate-400 text-sm">All fields populated instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600">Everything you need for fast, efficient form testing</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Instant Form Filling"
              description="Fill any form with realistic fake data in seconds. No manual typing, no copy-paste. Just click and fill."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Custom Templates"
              description="Save and reuse form configurations. Perfect for testing the same forms repeatedly with consistent data."
            />
            <FeatureCard
              icon={<Settings className="w-6 h-6" />}
              title="Smart Detection"
              description="Automatically detects field types (email, phone, address) and generates appropriate fake data for each."
            />
            <FeatureCard
              icon={<Code2 className="w-6 h-6" />}
              title="React & Vue Support"
              description="Works seamlessly with modern frameworks. Handles controlled components and synthetic events perfectly."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Privacy First"
              description="All data is generated locally in your browser. No server uploads, no tracking, no data collection."
            />
            <FeatureCard
              icon={<MousePointer className="w-6 h-6" />}
              title="Context Menu"
              description="Right-click any field to quickly fill it with specific data types like email, phone, or address."
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Install Extension"
              description="Add FormFill Pro to Chrome or Edge from your browser's extension store or load it manually."
            />
            <StepCard
              number="2"
              title="Navigate to Form"
              description="Go to any website with a form you need to test. The extension automatically detects form fields."
            />
            <StepCard
              number="3"
              title="Click & Fill"
              description="Click the extension icon and hit 'Fill All Forms'. Watch as realistic data fills every field instantly."
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Supported Data Types</h2>
            <p className="text-xl text-slate-400">Generate realistic data for any field type</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Names', 'Emails', 'Phones', 'Addresses', 'Cities', 'States',
              'ZIP Codes', 'Countries', 'Usernames', 'Passwords', 'Companies', 'Job Titles',
              'Birth Dates', 'Credit Cards', 'CVV', 'SSN', 'Websites', 'Paragraphs'
            ].map((type) => (
              <div
                key={type}
                className="bg-slate-800 rounded-lg px-4 py-3 text-center text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="install" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Install FormFill Pro</h2>
          <p className="text-xl text-slate-600 mb-12">
            Get the extension for Chrome or Edge and start filling forms instantly
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <Chrome className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Google Chrome</h3>
              <p className="text-slate-600 mb-6">Install directly from Chrome Web Store</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                Add to Chrome
              </button>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Microsoft Edge</h3>
              <p className="text-slate-600 mb-6">Install from Edge Add-ons store</p>
              <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-medium transition-colors">
                Add to Edge
              </button>
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Manual Installation (Developer Mode)</h3>
            <div className="text-left max-w-xl mx-auto space-y-3 text-slate-600">
              <p>1. Download and extract the extension files</p>
              <p>2. Open Chrome/Edge and go to <code className="bg-slate-200 px-2 py-1 rounded">chrome://extensions</code></p>
              <p>3. Enable "Developer mode" in the top right</p>
              <p>4. Click "Load unpacked" and select the <code className="bg-slate-200 px-2 py-1 rounded">extension</code> folder</p>
              <p>5. The extension icon will appear in your toolbar</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">FormFill Pro</span>
          </div>
          <p className="text-slate-400 text-sm">
            Privacy-first form filling for developers and QA engineers
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <Shield className="w-4 h-4" />
            100% Local - No Data Collection
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-600/30">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default App;
