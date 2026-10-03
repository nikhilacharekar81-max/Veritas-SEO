import React from 'react';
import type { SeoTool } from '../../lib/schemas';
import { useCms } from '../../lib/store';
import { SerpPixelSimulatorEngine } from './SerpPixelSimulatorEngine';
import { KeywordDensityAnalyzerEngine } from './KeywordDensityAnalyzerEngine';
import { SchemaJsonLdBuilderEngine } from './SchemaJsonLdBuilderEngine';
import { RedirectChainInspectorEngine } from './RedirectChainInspectorEngine';
import { RobotsSitemapValidatorEngine } from './RobotsSitemapValidatorEngine';
import { OnPageAuditScorerEngine } from './OnPageAuditScorerEngine';
import { CoreWebVitalsCalculatorEngine } from './CoreWebVitalsCalculatorEngine';
import { ReadabilityFleschAnalyzerEngine } from './ReadabilityFleschAnalyzerEngine';
import { HreflangMatrixEngine } from './HreflangMatrixEngine';
import { SerpRankCtrCalculatorEngine } from './SerpRankCtrCalculatorEngine';
import { BotHeaderSimulatorEngine } from './BotHeaderSimulatorEngine';
import { SocialCardStudioEngine } from './SocialCardStudioEngine';
import { CompressPdfEngine } from './CompressPdfEngine';

interface Props {
  tool: SeoTool;
  onCalculationPerformed?: () => void;
}

export const ToolEngineDispatcher: React.FC<Props> = ({ tool, onCalculationPerformed }) => {
  const { incrementToolUsageCount, trackToolUsage } = useCms();

  const handleCalculation = () => {
    incrementToolUsageCount(tool.id);
    trackToolUsage(
      tool.id,
      tool.title,
      tool.engineType,
      Math.floor(180 + Math.random() * 320),
      window.innerWidth < 640 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
    );
    if (onCalculationPerformed) {
      onCalculationPerformed();
    }
  };

  switch (tool.engineType) {
    case 'serp-pixel-simulator':
      return <SerpPixelSimulatorEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'keyword-density-analyzer':
      return <KeywordDensityAnalyzerEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'schema-jsonld-generator':
      return <SchemaJsonLdBuilderEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'redirect-chain-inspector':
      return <RedirectChainInspectorEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'robots-sitemap-validator':
      return <RobotsSitemapValidatorEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'onpage-audit-scorer':
      return <OnPageAuditScorerEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'cwv-cls-calculator':
      return <CoreWebVitalsCalculatorEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'readability-flesch-analyzer':
      return <ReadabilityFleschAnalyzerEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'hreflang-tag-matrix':
      return <HreflangMatrixEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'serp-rank-calculator':
      return <SerpRankCtrCalculatorEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'bot-header-inspector':
      return <BotHeaderSimulatorEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'social-card-studio':
      return <SocialCardStudioEngine tool={tool} onPerformCalculation={handleCalculation} />;
    case 'compress-pdf':
      return <CompressPdfEngine tool={tool} onPerformCalculation={handleCalculation} />;
    default:
      return <SerpPixelSimulatorEngine tool={tool} onPerformCalculation={handleCalculation} />;
  }
};

