import katex from 'katex';
import 'katex/dist/katex.min.css';

interface RenderOptions {
  displayMode?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: { [key: string]: string };
}

export const renderLatex = (
  latex: string,
  element: HTMLElement,
  options: RenderOptions = {}
): void => {
  const defaultOptions: RenderOptions = {
    displayMode: true,
    throwOnError: false,
    errorColor: '#cc0000',
    macros: {
      '\\RR': '\\mathbb{R}',
      '\\NN': '\\mathbb{N}',
      '\\ZZ': '\\mathbb{Z}',
      '\\QQ': '\\mathbb{Q}',
      '\\CC': '\\mathbb{C}',
    },
  };

  try {
    katex.render(latex, element, {
      ...defaultOptions,
      ...options,
    });
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    element.innerHTML = `<span style="color: ${options.errorColor || '#cc0000'}">
      Error rendering LaTeX: ${(error as Error).message}
    </span>`;
  }
};

export const validateLatex = (latex: string): boolean => {
  try {
    katex.renderToString(latex);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeLatex = (input: string): string => {
  // Supprimer les caractères potentiellement dangereux
  return input
    .replace(/[^\w\s\\\{\}\[\]\(\)\+\-\*\/\=\.\,\:\;\$]/g, '')
    .trim();
};