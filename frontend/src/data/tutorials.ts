export interface Exercise {
  id: string;
  question: string;
  hint?: string;
  solution: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Example {
  id: string;
  latex: string;
  explanation: string;
  rendered?: string;
}

export interface TutorialSection {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: Example[];
  exercises: Exercise[];
  order: number;
  category: 'basics' | 'mathematics' | 'physics' | 'chemistry' | 'advanced';
}

export interface ExerciseState {
  id: string;
  userAnswer: string;
  status?: 'correct' | 'incorrect';
  feedback?: string;
}
  
  export const tutorialSections: TutorialSection[] = [
    {
      id: 'basics-introduction',
      title: 'Introduction to LaTeX',
      description: 'Learn the fundamentals of LaTeX syntax and basic mathematical expressions',
      order: 1,
      category: 'basics',
      content: `
        LaTeX is a powerful typesetting system used for producing technical and scientific documentation.
        In this section, you'll learn the basic syntax and how to write simple mathematical expressions.
  
        Key concepts:
        - Math mode delimiters: $ and $$
        - Basic operators: +, -, ×, ÷
        - Superscripts and subscripts
        - Greek letters
      `,
      examples: [
        {
          id: 'basic-math',
          latex: 'E = mc^2',
          explanation: 'A simple equation using superscript',
        },
        {
          id: 'greek-letters',
          latex: '\\alpha + \\beta = \\gamma',
          explanation: 'Using Greek letters in equations',
        }
      ],
      exercises: [
        {
          id: 'ex-basic-1',
          question: 'Write the equation for the quadratic formula',
          hint: 'Start with x = and use \\frac for the fraction',
          solution: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
          explanation: 'The quadratic formula uses fractions, square roots, and superscripts',
          difficulty: 'beginner'
        }
      ]
    },
    {
      id: 'math-fractions',
      title: 'Working with Fractions',
      description: 'Master the art of writing fractions and nested expressions',
      order: 2,
      category: 'mathematics',
      content: `
        Fractions are fundamental in mathematical notation. In LaTeX, we use the \\frac command
        to create fractions. The syntax is \\frac{numerator}{denominator}.
  
        Advanced concepts:
        - Nested fractions
        - Display style vs. inline style
        - Binomial coefficients
      `,
      examples: [
        {
          id: 'simple-fraction',
          latex: '\\frac{1}{2} + \\frac{3}{4} = \\frac{5}{4}',
          explanation: 'Simple fraction addition',
        },
        {
          id: 'complex-fraction',
          latex: '\\frac{1 + \\frac{1}{x}}{1 + \\frac{1}{x^2}}',
          explanation: 'Nested fractions example',
        }
      ],
      exercises: [
        {
          id: 'ex-frac-1',
          question: 'Write a complex fraction with nested square roots',
          solution: '\\frac{\\sqrt{1 + \\sqrt{x}}}{\\sqrt{1 - \\sqrt{x}}}',
          explanation: 'This exercise combines fractions with nested square roots',
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: 'math-matrices',
      title: 'Matrices and Arrays',
      description: 'Learn to create matrices and align equations',
      order: 3,
      category: 'mathematics',
      content: `
        Matrices are essential in linear algebra and many other mathematical fields.
        LaTeX provides several environments for creating matrices:
        - matrix
        - bmatrix
        - pmatrix
        - vmatrix
        - Bmatrix
      `,
      examples: [
        {
          id: 'simple-matrix',
          latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
          explanation: '2x2 matrix with brackets',
        },
        {
          id: 'determinant',
          latex: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc',
          explanation: 'Determinant notation',
        }
      ],
      exercises: [
        {
          id: 'ex-matrix-1',
          question: 'Create a 3x3 identity matrix',
          solution: '\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}',
          explanation: 'The identity matrix has 1s on the diagonal and 0s elsewhere',
          difficulty: 'intermediate'
        }
      ]
    },
    {
      id: 'physics-equations',
      title: 'Physics Equations',
      description: 'Write common physics equations and notations',
      order: 4,
      category: 'physics',
      content: `
        Physics equations often require special notation for:
        - Vectors and unit vectors
        - Partial derivatives
        - Integrals with special limits
        - Physical units
      `,
      examples: [
        {
          id: 'vector-field',
          latex: '\\vec{E} = \\frac{1}{4\\pi\\epsilon_0} \\frac{q}{r^2} \\hat{r}',
          explanation: 'Electric field of a point charge',
        },
        {
          id: 'maxwell-equation',
          latex: '\\nabla \\cdot \\vec{B} = 0',
          explanation: 'One of Maxwell\'s equations',
        }
      ],
      exercises: [
        {
          id: 'ex-physics-1',
          question: 'Write the Schrödinger equation',
          solution: 'i\\hbar \\frac{\\partial}{\\partial t} \\Psi = \\hat{H} \\Psi',
          explanation: 'The time-dependent Schrödinger equation',
          difficulty: 'advanced'
        }
      ]
    },
    {
      id: 'chemistry-notation',
      title: 'Chemical Equations',
      description: 'Format chemical equations and reactions',
      order: 5,
      category: 'chemistry',
      content: `
        Chemical equations require special notation for:
        - Chemical reactions
        - Equilibrium arrows
        - State symbols
        - Charge numbers
      `,
      examples: [
        {
          id: 'chemical-reaction',
          latex: 'H_2 + \\frac{1}{2}O_2 \\rightarrow H_2O',
          explanation: 'Simple chemical reaction',
        },
        {
          id: 'equilibrium',
          latex: 'N_2 + 3H_2 \\rightleftharpoons 2NH_3',
          explanation: 'Equilibrium reaction',
        }
      ],
      exercises: [
        {
          id: 'ex-chem-1',
          question: 'Write the dissociation of sulfuric acid',
          solution: 'H_2SO_4 \\rightarrow 2H^+ + SO_4^{2-}',
          explanation: 'Ionic dissociation with charges',
          difficulty: 'intermediate'
        }
      ]
    }
  ];
  
  // Utility functions
  export const getTutorialByCategory = (category: string): TutorialSection[] => {
    return tutorialSections.filter(section => section.category === category)
      .sort((a, b) => a.order - b.order);
  };
  
  export const getTutorialById = (id: string): TutorialSection | undefined => {
    return tutorialSections.find(section => section.id === id);
  };
  
  export const getNextTutorial = (currentId: string): TutorialSection | undefined => {
    const currentIndex = tutorialSections.findIndex(section => section.id === currentId);
    if (currentIndex >= 0 && currentIndex < tutorialSections.length - 1) {
      return tutorialSections[currentIndex + 1];
    }
    return undefined;
  };
  
  export const getPreviousTutorial = (currentId: string): TutorialSection | undefined => {
    const currentIndex = tutorialSections.findIndex(section => section.id === currentId);
    if (currentIndex > 0) {
      return tutorialSections[currentIndex - 1];
    }
    return undefined;
  };
  
  export const filterTutorials = (query: string): TutorialSection[] => {
    const searchTerm = query.toLowerCase();
    return tutorialSections.filter(section =>
      section.title.toLowerCase().includes(searchTerm) ||
      section.description.toLowerCase().includes(searchTerm) ||
      section.content.toLowerCase().includes(searchTerm)
    );
  };
  
  export const getDifficultyLevels = (): Exercise['difficulty'][] => {
    return ['beginner', 'intermediate', 'advanced'];
  };
  
  export const getExercisesByDifficulty = (difficulty: Exercise['difficulty']): Exercise[] => {
    return tutorialSections
      .flatMap(section => section.exercises)
      .filter(exercise => exercise.difficulty === difficulty);
  };