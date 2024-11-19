interface LatexTemplate {
    label: string;
    code: string;
    description: string;
    documentation?: string;
    category: 'basic' | 'math' | 'physics' | 'chemistry' | 'advanced';
  }
  
  export const commonTemplates: LatexTemplate[] = [
    {
      label: 'Fraction',
      code: '\\frac{${1:numerator}}{${2:denominator}}',
      description: 'Insert a fraction',
      documentation: 'Creates a fraction with numerator and denominator',
      category: 'basic'
    },
    {
      label: 'Square Root',
      code: '\\sqrt{${1:expression}}',
      description: 'Insert a square root',
      documentation: 'Creates a square root expression',
      category: 'basic'
    },
    {
      label: 'Nth Root',
      code: '\\sqrt[${1:n}]{${2:expression}}',
      description: 'Insert an nth root',
      documentation: 'Creates an nth root expression',
      category: 'basic'
    },
    {
      label: 'Integral',
      code: '\\int_{${1:lower}}^{${2:upper}} ${3:expression} \\,d${4:x}',
      description: 'Insert a definite integral',
      documentation: 'Creates a definite integral with bounds',
      category: 'math'
    },
    {
      label: 'Sum',
      code: '\\sum_{${1:i}=${2:1}}^{${3:n}} ${4:expression}',
      description: 'Insert a summation',
      documentation: 'Creates a summation with index and bounds',
      category: 'math'
    },
    {
      label: 'Matrix',
      code: '\\begin{matrix}\n${1:a} & ${2:b} \\\\\n${3:c} & ${4:d}\n\\end{matrix}',
      description: 'Insert a matrix',
      documentation: 'Creates a 2x2 matrix',
      category: 'advanced'
    },
    {
      label: 'Chemical Equation',
      code: '\\ce{${1:reactants} -> ${2:products}}',
      description: 'Insert a chemical equation',
      documentation: 'Creates a chemical equation using mhchem package',
      category: 'chemistry'
    }
  ];
  
  export const getTemplatesByCategory = (category: string): LatexTemplate[] => {
    return commonTemplates.filter(template => template.category === category);
  };
  
  export const searchTemplates = (query: string): LatexTemplate[] => {
    const searchTerm = query.toLowerCase();
    return commonTemplates.filter(template => 
      template.label.toLowerCase().includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm)
    );
  };