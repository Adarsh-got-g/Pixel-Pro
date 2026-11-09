import React, { useState } from 'react';
import { AppView, StudioTool } from './types';
import { WindowsTitleBar } from './components/brand/WindowsTitleBar';
import { PhotoStudioWorkspace } from './components/studio/PhotoStudioWorkspace';
import { BrandAssetStudio } from './components/brand/BrandAssetStudio';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { SplashScreen } from './components/startup/SplashScreen';
import { InstallerWizard } from './components/installer/InstallerWizard';
import { PortableLauncher } from './components/portable/PortableLauncher';
import { AboutModal } from './components/about/AboutModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [activeTool, setActiveTool] = useState<StudioTool>('enhance');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  const handleToolSelect = (tool: StudioTool) => {
    setActiveTool(tool);
    setCurrentView('studio');
  };

  const handleUploadImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setUserImage(url);
    setCurrentView('studio');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#080D20] text-white select-none">
      {/* 1. Official Windows Title Bar with Simplified Taskbar App Icon & Menus */}
      <WindowsTitleBar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* 2. Primary Application Viewport */}
      <main className="flex-1 relative overflow-hidden">
        {currentView === 'welcome' && (
          <WelcomeScreen
            onNavigate={setCurrentView}
            onSelectTool={handleToolSelect}
            onUploadImage={handleUploadImage}
          />
        )}

        {currentView === 'studio' && (
          <PhotoStudioWorkspace
            initialTool={activeTool}
            userUploadedImage={userImage}
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenBrandHub={() => setCurrentView('brand_hub')}
          />
        )}

        {currentView === 'brand_hub' && (
          <BrandAssetStudio />
        )}

        {currentView === 'splash' && (
          <SplashScreen
            onComplete={() => setCurrentView('studio')}
            autoProgress={true}
          />
        )}

        {currentView === 'installer' && (
          <InstallerWizard
            onComplete={() => setCurrentView('studio')}
            onCancel={() => setCurrentView('welcome')}
          />
        )}

        {currentView === 'portable' && (
          <PortableLauncher
            onLaunch={() => setCurrentView('studio')}
            onClose={() => setCurrentView('welcome')}
          />
        )}
      </main>

      {/* 3. Professional About Dialog */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
