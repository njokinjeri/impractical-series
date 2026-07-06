import type { Language, HelloByte } from './types';

export const ALL_LANGUAGES: Language[] = [
  {
    name: 'Python',
    code: 'print("Hello, World!")',
    color: '#4EC9B0',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'JavaScript',
    code: 'console.log("Hello, World!")',
    color: '#E5C07B',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Java',
    code: 'System.out.println("Hello, World!");',
    color: '#E06C75',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'C',
    code: 'printf("Hello, World!\\n");',
    color: '#61AFEF',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'C++',
    code: 'cout << "Hello, World!" << endl;',
    color: '#80DEEA',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'C#',
    code: 'Console.WriteLine("Hello, World!");',
    color: '#9CDCFE',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Ruby',
    code: 'puts "Hello, World!"',
    color: '#C678DD',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Go',
    code: 'fmt.Println("Hello, World!")',
    color: '#56B6C2',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Rust',
    code: 'println!("Hello, World!");',
    color: '#FF9E64',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Swift',
    code: 'print("Hello, World!")',
    color: '#F78C6C',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Kotlin',
    code: 'println("Hello, World!")',
    color: '#BB86FC',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'PHP',
    code: 'echo "Hello, World!";',
    color: '#7986CB',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Lua',
    code: 'print("Hello, World!")',
    color: '#A5D6A7',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Haskell',
    code: 'putStrLn "Hello, World!"',
    color: '#98C379',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'R',
    code: 'cat("Hello, World!\\n")',
    color: '#F2C94C',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
  {
    name: 'Dart',
    code: 'print("Hello, World!");',
    color: '#26C6DA',
    _charIndex: 0,
    _spawnTimer: 0,
    _spawnDelay: 4,
  },
];

export const HELLO_STR = 'Hello, World!';
export const HELLO_FULL = '"Hello, World!"';

export function toNibble(char: string): string {
  const b = char.charCodeAt(0).toString(2).padStart(8, '0');
  return b.slice(0, 4) + ' ' + b.slice(4);
}

export const HELLO_SEQ: HelloByte[] = HELLO_STR.split('').map((c) => ({
  char: c,
  nibble: toNibble(c),
}));

export function getLangsForRound(
  roundIndex: number,
  threadCount: number
): Language[] {
  const output: Language[] = [];
  for (let i = 0; i < threadCount; i++) {
    const src =
      ALL_LANGUAGES[(roundIndex * threadCount + i) % ALL_LANGUAGES.length];
    output.push({
      ...src,
      _charIndex: 0,
      _spawnTimer: i * 3,
      _spawnDelay: 4 + i * 0.4,
    });
  }
  return output;
}
