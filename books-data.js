(function (global) {
  const RAW_BOOKS = [
    { title: "1일 1로그 100일 완성 IT 지식", publisher: "인사이트", url: "http://aladin.kr/p/ZfTq5", group: "공부" },
    { title: "혼자 공부하는 컴퓨터 구조 + 운영체제", publisher: "한빛미디어", url: "http://aladin.kr/p/9fkcx", group: "공부" },
    { title: "헤드 퍼스트 디자인 패턴", publisher: "한빛미디어", url: "http://aladin.kr/p/0feC8", group: "공부" },
    { title: "테스트 주도 개발", publisher: "인사이트", url: "http://aladin.kr/p/dGXdZ", group: "기술" },
    { title: "소프트웨어 아키텍처 The Basics", publisher: "한빛미디어", url: "https://aladin.kr/p/0C7k2", group: "기술" },
    { title: "구글 엔지니어는 이렇게 일한다", publisher: "한빛미디어", url: "http://aladin.kr/p/OPKnr", group: "기술" },
    { title: "리팩터링 2판", publisher: "한빛미디어", url: "http://aladin.kr/p/3NQRD", group: "기술" },
    { title: "켄트 벡의 Tidy First?", publisher: "한빛미디어", url: "https://aladin.kr/p/cqor7", group: "기술" },
    { title: "#100일 챌린지", publisher: "인사이트", url: "https://aladin.kr/p/CRHc6", group: "성장" },
    { title: "실용주의 프로그래머", publisher: "인사이트", url: "http://aladin.kr/p/6fZmv", group: "성장" },
    { title: "미니멀리즘 프로그래머", publisher: "한빛미디어", url: "https://aladin.kr/p/GCuAM", group: "성장" },
    { title: "더 나은 프로그래머 되는 법", publisher: "한빛미디어", url: "http://aladin.kr/p/yqSGA", group: "성장" },
    { title: "다시 깊게 익히는 인사이드 리액트", publisher: "골든래빗", url: "https://aladin.kr/p/FCTam", group: "언어" },
    { title: "이펙티브 자바", publisher: "인사이트", url: "http://aladin.kr/p/3LwoI", group: "언어" },
    { title: "You Don’t Know JS Yet", publisher: "한빛미디어", url: "http://aladin.kr/p/EQJwc", group: "언어" },
    { title: "코딩 테스트 합격자 되기 : 자바 편", publisher: "골든래빗", url: "https://aladin.kr/p/LQLCz", group: "취업" },
    { title: "면접을 위한 CS 전공지식 노트", publisher: "길벗", url: "http://aladin.kr/p/WfPrd", group: "취업" },
    { title: "가상 면접 사례로 생성형 AI 서비스 설계", publisher: "인사이트", url: "https://aladin.kr/p/hS4rp", group: "취업" },
    { title: "개발자로 살아남기", publisher: "골든래빗", url: "https://aladin.kr/p/g4Gzu", group: "커리어" },
    { title: "개발자 원칙(확장판)", publisher: "골든래빗", url: "https://aladin.kr/p/kqgEC", group: "커리어" },
    { title: "소프트 스킬", publisher: "길벗", url: "https://aladin.kr/p/3fsBa", group: "커리어" },
    { title: "커리어 스킬", publisher: "길벗", url: "http://aladin.kr/p/qepBm", group: "커리어" },
    { title: "AI시대, 개발자로 살아가기", publisher: "심통", url: "https://aladin.kr/p/R4vYD", group: "커리어" },
    { title: "피플웨어", publisher: "인사이트", url: "http://aladin.kr/p/Zbf6x", group: "커리어" },
    { title: "바이브 코딩 너머 개발자 생존법", publisher: "한빛미디어", url: "https://aladin.kr/p/mCRz5", group: "커리어" },
    { title: "개발자를 위한 커리어 관리 핸드북", publisher: "한빛미디어", url: "http://aladin.kr/p/GqQa9", group: "커리어" },
    { title: "요즘 개발자", publisher: "한빛미디어", url: "http://aladin.kr/p/bQhlS", group: "커리어" },
    { title: "2026 AI 100 생존 전략 트렌드 쉴드(SHIELD)", publisher: "골든래빗", url: "https://aladin.kr/p/qC1G8", group: "트렌드" },
    { title: "해상도를 높여라", publisher: "인사이트", url: "https://aladin.kr/p/HSnWR", group: "트렌드" },
    { title: "요즘 당근 AI 개발", publisher: "골든래빗", url: "https://aladin.kr/p/0CHU7", group: "AI" },
    { title: "대규모 언어 모델, 핵심만 빠르게", publisher: "인사이트", url: "https://aladin.kr/p/VCUEA", group: "AI" },
    { title: "어쨌든, 에이전틱 코딩", publisher: "인사이트", url: "https://aladin.kr/p/8S87W", group: "AI" },
    { title: "바로바로 바이브 코딩 with 커서", publisher: "골든래빗", url: "https://aladin.kr/p/rS9II", group: "AI" },
    { title: "요즘 바이브 코딩 클로드 코드 완벽 가이드", publisher: "골든래빗", url: "https://aladin.kr/p/ACCgU", group: "AI" },
    { title: "바로바로 클로드 with 코워크, 스킬, 클로드 코드, 디자인", publisher: "골든래빗", url: "https://aladin.kr/p/aSLfg", group: "AI" },
    { title: "클로드 코드로 시작하는 실전 에이전틱 코딩", publisher: "인사이트", url: "https://aladin.kr/p/rSLvw", group: "AI" },
    { title: "AI 시대의 프로그래머", publisher: "한빛미디어", url: "https://aladin.kr/p/Uqp0P", group: "AI" },
    { title: "AI 시대의 데이터 패러독스", publisher: "에이콘", url: "https://aladin.kr/p/eCsOh", group: "AI" },
  ];

  const IMAGE_FILES = [
    "100일 챌린지.jpg",
    "1일 1로그 100일 완성 IT 지식.jpg",
    "2026 AI 100 생존 전략 트렌드 쉴드.jpg",
    "AI 시대의 데이터 패러독스.jpg",
    "AI 시대의 프로그래머.jpg",
    "AI시대, 개발자로 살아가기.jpg",
    "You Don’t Know JS Yet.jpg",
    "가상 면접 사례로 생성형 AI 서비스 설계.jpg",
    "개발자 기술 면접 노트(개정판).jpg",
    "개발자 원칙(확장판).jpg",
    "개발자로 살아남기.jpg",
    "개발자를 위한 커리어 관리 핸드북.jpg",
    "구글 엔지니어는 이렇게 일한다.jpg",
    "다시 깊게 익히는 인사이드 리액트.jpg",
    "대규모 언어 모델, 핵심만 빠르게.jpg",
    "더 나은 프로그래머 되는 법.jpg",
    "리팩터링 2판.jpg",
    "면접을 위한 CS 전공지식 노트.jpg",
    "미니멀리즘 프로그래머.jpg",
    "바로바로 바이브 코딩 with 커서.jpg",
    "바로바로 클로드 with 코워크, 스킬, 클로드 코드, 디자인.jpg",
    "바이브 코딩 너머 개발자 생존법.jpg",
    "소프트 스킬.jpg",
    "소프트웨어 아키텍처 The Basics.jpg",
    "실용주의 프로그래머.jpg",
    "어쨌든 에이전틱 코딩.jpg",
    "요즘 개발자.jpg",
    "요즘 당근 AI 개발.jpg",
    "요즘 바이브 코딩 클로드 코드 완벽 가이드.jpg",
    "이펙티브 자바.jpg",
    "커리어 스킬.jpg",
    "켄트 벡의 Tidy First.jpg",
    "코딩 테스트 합격자 되기_자바 편.jpg",
    "클로드 코드로 시작하는 실전 에이전틱 코딩.jpg",
    "테스트 주도 개발.jpg",
    "피플웨어.jpg",
    "해상도를 높여라.jpg",
    "헤드 퍼스트 디자인 패턴.jpg",
    "혼자 공부하는 컴퓨터 구조 + 운영체제.jpg",
  ];

  const GROUP_META = {
    "공부": {
      id: "study",
      description: "기초 체력을 다지기 좋은 책들입니다. 운영체제, 패턴, 기본 IT 지식을 다시 정리할 때 출발점이 됩니다.",
    },
    "기술": {
      id: "engineering",
      description: "테스트, 설계, 리팩터링처럼 코드 품질과 시스템 구조를 다루는 책들을 모았습니다.",
    },
    "성장": {
      id: "growth",
      description: "개발 습관과 문제 해결 태도를 다듬는 데 도움이 되는 책들입니다.",
    },
    "언어": {
      id: "language",
      description: "언어와 프레임워크를 더 깊게 이해하고 구현 감각을 넓히는 데 초점을 둡니다.",
    },
    "취업": {
      id: "job",
      description: "코딩 테스트, CS 면접, 서비스 설계 면접 준비에 직접적으로 연결되는 책들입니다.",
    },
    "커리어": {
      id: "career",
      description: "일하는 방식, 협업, 장기적인 개발자 커리어를 고민할 때 참고할 만한 책들입니다.",
    },
    "트렌드": {
      id: "trend",
      description: "기술 변화의 방향을 읽고 지금 무엇을 익혀야 할지 감을 잡는 데 도움을 주는 책들입니다.",
    },
    "AI": {
      id: "ai",
      description: "LLM, 바이브 코딩, 에이전트 개발처럼 최근 AI 개발 흐름을 다루는 책들입니다.",
    },
  };

  function normalizeTitle(value) {
    return String(value || "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, "\"")
      .replace(/\(([a-z0-9\s&._-]+)\)/gi, " ")
      .replace(/[#?,:!()[\]{}._\-+]/g, " ")
      .replace(/\s+/g, "")
      .trim();
  }

  function createMatchKeys(value) {
    const normalized = normalizeTitle(value);
    const withoutAscii = normalizeTitle(String(value || "").replace(/\(([a-z0-9\s&._-]+)\)/gi, " "));
    return Array.from(new Set([normalized, withoutAscii])).filter(Boolean);
  }

  function findImageForTitle(title, imageFiles = IMAGE_FILES) {
    const titleKeys = createMatchKeys(title);
    const exactMap = new Map();

    imageFiles.forEach((file) => {
      createMatchKeys(file.replace(/\.[^.]+$/, "")).forEach((key) => {
        if (!exactMap.has(key)) {
          exactMap.set(key, file);
        }
      });
    });

    for (const key of titleKeys) {
      if (exactMap.has(key)) {
        return `images/${exactMap.get(key)}`;
      }
    }

    for (const key of titleKeys) {
      for (const file of imageFiles) {
        const fileKeys = createMatchKeys(file.replace(/\.[^.]+$/, ""));
        if (fileKeys.some((fileKey) => fileKey.includes(key) || key.includes(fileKey))) {
          return `images/${file}`;
        }
      }
    }

    return null;
  }

  function buildBookGroups(rawBooks = RAW_BOOKS) {
    const grouped = new Map();

    rawBooks.forEach((book) => {
      if (!grouped.has(book.group)) {
        grouped.set(book.group, []);
      }

      grouped.get(book.group).push({
        title: book.title,
        publisher: book.publisher,
        url: book.url,
        image: findImageForTitle(book.title),
      });
    });

    return Array.from(grouped.entries()).map(([groupName, books], index) => {
      const meta = GROUP_META[groupName] || {
        id: `group-${index + 1}`,
        description: `${groupName} 관련 도서`,
      };

      return {
        id: meta.id,
        number: String(index + 1).padStart(2, "0"),
        name: groupName,
        description: meta.description,
        books,
      };
    });
  }

  const BOOK_GROUPS = buildBookGroups();

  global.BOOK_GROUPS = BOOK_GROUPS;
  global.__BOOKS_DATA__ = {
    RAW_BOOKS,
    IMAGE_FILES,
    GROUP_META,
    normalizeTitle,
    createMatchKeys,
    findImageForTitle,
    buildBookGroups,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      RAW_BOOKS,
      IMAGE_FILES,
      GROUP_META,
      BOOK_GROUPS,
      normalizeTitle,
      createMatchKeys,
      findImageForTitle,
      buildBookGroups,
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
