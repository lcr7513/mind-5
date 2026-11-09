import { Student, RoadmapMilestone, InquiryActivityRecord, TeacherFeedback } from '../types';

interface DomainProfile {
  isGeographyOrUrban: boolean;
  isBio: boolean;
  isAi: boolean;
  isBatteryOrSemi: boolean;
  isEnvOrEcon: boolean;
  isLawOrSocial: boolean;
  isAeroOrMech: boolean;
  isHumanitiesOrMedia: boolean;
}

export function detectStudentDomain(student: Student): DomainProfile {
  const context = `${student.targetCareer || ''} ${student.targetMajor || ''} ${student.mainInterestTopic || ''} ${(student.interestKeywords || []).join(' ')} ${(student.preferredSubjects || []).join(' ')}`.toLowerCase();

  return {
    isGeographyOrUrban: /지역|도시|공간|지리|불평등|인구소멸|소멸|도시계획|행정|지방|인프라|국토|교통|정주|소외|주거|슬럼|젠트리피케이션|국토교통|생활권|거점/i.test(context),
    isBio: /생명|바이오|유전자|crispr|크리스퍼|의약|단백질|세포|의예|약학|간호|면역|치료|신경|뇌과학|항체/i.test(context),
    isAi: /ai|인공지능|컴퓨터|소프트웨어|알고리즘|머신러닝|딥러닝|빅데이터|코딩|데이터|언어모델|llm|비전|트랜스포머/i.test(context),
    isBatteryOrSemi: /배터리|이차전지|전고체|반도체|나노|신소재|전자|회로|물성|cmos|웨이퍼|초전도/i.test(context),
    isEnvOrEcon: /환경|기후|탄소|생태|신재생|esg|배출권|경제|경영|금융|시장|피구세|인플레이션|소비자/i.test(context),
    isLawOrSocial: /법|정치|사회|정의|윤리|인권|헌법|규제|공공|복지|행정|조례|롤스|사법/i.test(context),
    isAeroOrMech: /우주|항공|로봇|기계|열역학|유체|발사체|위성|자율주행|드론/i.test(context),
    isHumanitiesOrMedia: /미디어|언론|문학|어학|철학|역사|텍스트|프레임|리터러시|국어|영어/i.test(context),
  };
}

// 1. Generate 5-stage Tailored 3-Year Career Roadmap based on student's profile
export function generateTailoredRoadmap(student: Student): RoadmapMilestone[] {
  const domain = detectStudentDomain(student);
  const cleanInterest = student.mainInterestTopic || '교과 연계 첨단 기술 쟁점';
  const targetCareer = student.targetCareer || '전문 연구원';
  const targetMajor = student.targetMajor || '자연과학/공학 계열';

  if (domain.isGeographyOrUrban) {
    return [
      {
        id: `road-${student.id}-1`,
        gradeSemester: '1학년 1학기',
        stage: '기초 탐색기',
        category: '교과세특',
        title: `통합사회 / 한국지리: 수도권 과밀화와 지방 중소도시 인구 구조 변화의 공간적 상관관계`,
        description: `통계청 KOSIS 인구총조사 데이터를 활용하여 20년간 시군구별 청년 인구 순이동 추이를 비교 분석하고, 중심지 이론에 기반한 정주 여건 격차 규명`,
        status: 'completed',
        keyCompetency: '학업역량 (지리 공간 정보 해석 및 사회 현상 통계 실증)',
        linkedSubject: '통합사회',
      },
      {
        id: `road-${student.id}-2`,
        gradeSemester: '1학년 2학기',
        stage: '기초 탐색기',
        category: '동아리',
        title: `지역사회연구동아리: QGIS를 활용한 우리 지역 필수 공공시설(응급의료·문화) 접근성 버퍼 분석`,
        description: `공공데이터포털 의료기관 위치 데이터와 지적도를 중첩하여 반경 2km 이내 골든타임 사각지대를 시각화하고 취약 권역 보고서 작성`,
        status: 'completed',
        keyCompetency: '진로역량 (GIS 공간정보 분석 도구 운용 및 지역 문제 발굴)',
        linkedSubject: '동아리활동',
      },
      {
        id: `road-${student.id}-3`,
        gradeSemester: '2학년 1학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `수학 (수학Ⅱ / 미적분): 정적분과 로렌츠 곡선을 활용한 광역 교통망 확충 전후 공간 불평등 지수(지니계수) 측정`,
        description: `수도권 집중도와 지방 거점 인프라 분포의 불평등도를 정적분 면적비로 수식화하고 교통망 개통 전후 지니계수 변화율 정량 모델링`,
        status: 'completed',
        keyCompetency: '학업역량 (정적분 수학 원리의 실세계 불평등 정량 측정 응용)',
        linkedSubject: '수학Ⅱ/미적분',
      },
      {
        id: `road-${student.id}-4`,
        gradeSemester: '2학년 2학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `생활과 윤리 / 정치와 법: 롤스의 정의론(차등의 원칙)과 도시재생 특별법의 권리 보호 한계 고찰`,
        description: `상가건물 임대차보호법과 도시재생 특별법 조항을 비교하며 젠트리피케이션으로 내몰리는 원주민 상인 보호를 위한 공간권(Right to the City) 법리 분석`,
        status: 'in_progress',
        keyCompetency: '진로역량 (공공 정책의 윤리적·법적 타당성 검토 및 조례안 기안)',
        linkedSubject: '생활과 윤리',
      },
      {
        id: `road-${student.id}-5`,
        gradeSemester: '3학년 1학기',
        stage: '융합 발전기',
        category: '진로탐색',
        title: `융합과학탐구 / 심화영어: UN-Habitat 글로벌 도시 보고서 분석을 통한 스마트 축소(Smart Shrinkage) 기반 지방소멸 대응 정책 제언`,
        description: `해외 인구감소 지역의 압축도시(Compact City) 성공 사례 원문 보고서를 비교 분석하여 한국형 복합환승 거점 중심 압축 네트워크 모델 기획서 완성`,
        status: 'planned',
        keyCompetency: '융합발전역량 (글로벌 도시계획 문헌 심층 독해 및 실천적 국토 공간 전략 수립)',
        linkedSubject: '융합과학탐구',
      },
    ];
  }

  if (domain.isBio) {
    return [
      {
        id: `road-${student.id}-1`,
        gradeSemester: '1학년 1학기',
        stage: '기초 탐색기',
        category: '교과세특',
        title: `통합과학: 생체 분자의 구조와 핵산(DNA/RNA)의 입체적 상호작용 분석`,
        description: `단백질 접힘과 핵산의 상보적 결합 원리를 학습하고, MolView 3D 분자 뷰어로 입체 구조와 수소 결합 가시화`,
        status: 'completed',
        keyCompetency: '학업역량 (기초과학 탐구력 및 생명 현상 모델링)',
        linkedSubject: '통합과학',
      },
      {
        id: `road-${student.id}-2`,
        gradeSemester: '1학년 2학기',
        stage: '기초 탐색기',
        category: '동아리',
        title: `과학실험동아리: 아가로스 겔 전기영동 및 플라스미드 추출을 통한 분자생물학 기법 습득`,
        description: `제한효소 반응 후 DNA 단편 분리 실험을 수행하고, 버퍼 농도 및 전압에 따른 이동 속도 오차를 정량 분석`,
        status: 'completed',
        keyCompetency: '진로역량 (실험 설계 및 분자생물학 계측 도구 활용)',
        linkedSubject: '동아리활동',
      },
      {
        id: `road-${student.id}-3`,
        gradeSemester: '2학년 1학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `확률과 통계 / 화학Ⅱ: ${cleanInterest.slice(0, 26)} 관련 조건부 확률 및 반응 평형 모델링`,
        description: `베이즈 정리 및 르샤틀리에 원리를 적용하여 표적 결합 오차율을 수리적으로 시뮬레이션하고 최적 임계 조건 산출`,
        status: 'completed',
        keyCompetency: '학업역량 (수리·과학 융합 모델링 및 데이터 분석)',
        linkedSubject: '확률과 통계',
      },
      {
        id: `road-${student.id}-4`,
        gradeSemester: '2학년 2학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `생명과학Ⅱ: ${cleanInterest.slice(0, 28)}의 분자 메커니즘 및 3차원 변이체 구조 분석`,
        description: `PDB 단백질 데이터베이스 분자 도킹 분석을 통해 오프타깃 결합 에너지를 비교하고 활성 부위 돌연변이 영향 규명`,
        status: 'in_progress',
        keyCompetency: '진로역량 (전공 심화 생명과학 탐구 및 논문 강독)',
        linkedSubject: '생명과학Ⅱ',
      },
      {
        id: `road-${student.id}-5`,
        gradeSemester: '3학년 1학기',
        stage: '융합 발전기',
        category: '진로탐색',
        title: `융합과학탐구 / 생활과 윤리: 체내 약물 전달체(LNP/AAV) 최적화 및 생명윤리 거버넌스 제언`,
        description: `1·2학년 분자 수준 탐구를 토대로 생체 내 전달 효율 한계를 극복하는 지질나노입자 설계와 난치병 치료제 접근성 윤리 고찰`,
        status: 'planned',
        keyCompetency: '융합발전역량 (의생명 테크놀로지 및 생명윤리 통합 소양)',
        linkedSubject: '융합과학탐구',
      },
    ];
  }

  if (domain.isAi) {
    return [
      {
        id: `road-${student.id}-1`,
        gradeSemester: '1학년 1학기',
        stage: '기초 탐색기',
        category: '교과세특',
        title: `정보: 기본 정렬·탐색 알고리즘의 시간 복잡도(Big-O) 측정 및 파이썬 벤치마크`,
        description: `퀵 정렬과 이진 탐색의 최선/최악 시간 복잡도를 계산하고, 데이터 입력 규모에 따른 메모리 점유율을 그래프로 시각화`,
        status: 'completed',
        keyCompetency: '학업역량 (컴퓨팅 사고력 및 알고리즘 분석)',
        linkedSubject: '정보',
      },
      {
        id: `road-${student.id}-2`,
        gradeSemester: '1학년 2학기',
        stage: '기초 탐색기',
        category: '동아리',
        title: `SW동아리: Open API 연계 공공데이터 수집 및 Pandas 탐색적 데이터 분석(EDA)`,
        description: `공공데이터포털 JSON API를 파이썬으로 파싱하고 결측치 정제 및 피어슨 상관계수 히트맵 시각화 파이프라인 구축`,
        status: 'completed',
        keyCompetency: '진로역량 (데이터 파이프라인 구축 및 실증 분석)',
        linkedSubject: '동아리활동',
      },
      {
        id: `road-${student.id}-3`,
        gradeSemester: '2학년 1학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `인공지능 수학 / 기하: ${cleanInterest.slice(0, 26)} 관련 고차원 벡터 내적과 코사인 유사도 분석`,
        description: `다차원 임베딩 공간에서 텍스트/이미지 벡터 간의 거리 계산 및 소프트맥스 함수의 기울기 소실 방지 수식 유도`,
        status: 'completed',
        keyCompetency: '학업역량 (선형대수학적 수리 모델링 및 AI 알고리즘 해석)',
        linkedSubject: '인공지능 수학',
      },
      {
        id: `road-${student.id}-4`,
        gradeSemester: '2학년 2학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `인공지능 기초 / 물리학Ⅰ: ${cleanInterest.slice(0, 28)}의 환각 저감 및 하드웨어 가속 최적화`,
        description: `검색 증강 생성(RAG) 파이프라인 구축과 GPU 메모리 대역폭(Memory Wall) 병목 극복을 위한 경량화(Quantization) 고찰`,
        status: 'in_progress',
        keyCompetency: '진로역량 (소프트웨어-하드웨어 통합 시스템 아키텍처)',
        linkedSubject: '인공지능 기초',
      },
      {
        id: `road-${student.id}-5`,
        gradeSemester: '3학년 1학기',
        stage: '융합 발전기',
        category: '진로탐색',
        title: `정치와 법 / 독서: 생성형 AI 지식재산권 공정이용(Fair Use) 및 알고리즘 윤리 감사 가이드라인 제언`,
        description: `학습용 데이터 크롤링의 저작권 판례와 편향성 완화 모델을 종합하여 청소년 자치 AI 윤리 준칙 및 공공 정책 보고서 집필`,
        status: 'planned',
        keyCompetency: '융합발전역량 (인공지능 거버넌스 및 디지털 시민성)',
        linkedSubject: '정치와 법',
      },
    ];
  }

  if (domain.isBatteryOrSemi || domain.isAeroOrMech) {
    return [
      {
        id: `road-${student.id}-1`,
        gradeSemester: '1학년 1학기',
        stage: '기초 탐색기',
        category: '교과세특',
        title: `통합과학 / 공통수학: 에너지 보존 법칙과 전자기 유도 현상의 수리적 모델링`,
        description: `패러데이 법칙과 렌츠의 법칙을 실험하고, 코일 권선수 및 자속 변화율에 따른 유도 기전력 수식을 그래프로 해석`,
        status: 'completed',
        keyCompetency: '학업역량 (기초 물리 법칙 규명 및 기하학적 해석)',
        linkedSubject: '통합과학',
      },
      {
        id: `road-${student.id}-2`,
        gradeSemester: '1학년 2학기',
        stage: '기초 탐색기',
        category: '동아리',
        title: `공학탐구동아리: 아두이노 센서 융합 계측 및 열전도율(Peltier) 측정 실험`,
        description: `MBL 디지털 센서를 활용하여 신소재 시편의 열전도도와 쿨롱 효율을 측정하고 측정 오차 보정치 산출`,
        status: 'completed',
        keyCompetency: '진로역량 (하드웨어 인터페이스 설계 및 실험 정밀도 확보)',
        linkedSubject: '동아리활동',
      },
      {
        id: `road-${student.id}-3`,
        gradeSemester: '2학년 1학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `물리학Ⅰ / 화학Ⅰ: ${cleanInterest.slice(0, 26)} 관련 밴드갭 이론 및 전기화학 전극 전위 분석`,
        description: `네른스트 식과 에너지 띠 이론을 결합하여 전하 이동 속도와 계면 저항을 분석하고 소재 변환 효율 최적화`,
        status: 'completed',
        keyCompetency: '학업역량 (물리화학적 메커니즘 규명 및 정량 분석)',
        linkedSubject: '물리학Ⅰ',
      },
      {
        id: `road-${student.id}-4`,
        gradeSemester: '2학년 2학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `물리학Ⅱ / 미적분: ${cleanInterest.slice(0, 28)}의 열역학적 엔트로피 손실과 미분방정식 궤적 최적화`,
        description: `열역학 제2법칙 카르노 효율 모델을 지오지브라로 시뮬레이션하고 열 손실을 최소화하는 냉각/제어 프로토콜 수립`,
        status: 'in_progress',
        keyCompetency: '진로역량 (고급 열역학 해석 및 공학적 최적 설계)',
        linkedSubject: '물리학Ⅱ',
      },
      {
        id: `road-${student.id}-5`,
        gradeSemester: '3학년 1학기',
        stage: '융합 발전기',
        category: '진로탐색',
        title: `융합과학탐구 / 경제: 전과정 평가(LCA) 기반 탄소발자국 저감과 차세대 공학 솔루션 경제성 평가`,
        description: `제조부터 폐기·재활용까지의 전과정 에너지 부하를 계산하고 친환경 공정 전환의 비용편익(B/C) 분석 보고서 완성`,
        status: 'planned',
        keyCompetency: '융합발전역량 (지속 가능한 미래 공학 및 전과정 평가 소양)',
        linkedSubject: '융합과학탐구',
      },
    ];
  }

  if (domain.isEnvOrEcon) {
    return [
      {
        id: `road-${student.id}-1`,
        gradeSemester: '1학년 1학기',
        stage: '기초 탐색기',
        category: '교과세특',
        title: `통합사회: 외부 불경제와 환경오염으로 인한 시장 실패의 해결 기제 비교`,
        description: `직접 규제와 시장 유인책(피구세 및 배출권 거래제)의 장단점을 경제 교과서 원리에 비추어 비교 분석`,
        status: 'completed',
        keyCompetency: '학업역량 (경제 이론 적용 및 사회 현상 비판적 분석)',
        linkedSubject: '통합사회',
      },
      {
        id: `road-${student.id}-2`,
        gradeSemester: '1학년 2학기',
        stage: '기초 탐색기',
        category: '동아리',
        title: `시사경제동아리: 탄소배출권 거래 가격 변동성 데이터 시각화 및 기업 공시(ESG) 분석`,
        description: `KOSIS 및 KRX 배출권 시장 통계 데이터를 엑셀로 가공하여 산업별 배출량과 기업 친환경 투자 간의 상관관계 도출`,
        status: 'completed',
        keyCompetency: '진로역량 (공공 통계 가공 및 계량 경제 기초 분석)',
        linkedSubject: '동아리활동',
      },
      {
        id: `road-${student.id}-3`,
        gradeSemester: '2학년 1학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `경제 / 수학Ⅱ: ${cleanInterest.slice(0, 26)} 관련 한계저감비용(MAC)과 최적 조세 수리 모델링`,
        description: `미분계수를 활용하여 기업의 감축 비용 함수와 사회적 한계 피해 비용 곡선의 교점을 구하는 수리적 최적화 수행`,
        status: 'completed',
        keyCompetency: '학업역량 (수리경제학적 최적화 및 외부효과 수식화)',
        linkedSubject: '경제',
      },
      {
        id: `road-${student.id}-4`,
        gradeSemester: '2학년 2학기',
        stage: '심화 탐구기',
        category: '교과세특',
        title: `확률과 통계: ${cleanInterest.slice(0, 28)}의 가격 변동 리스크와 시계열 회귀분석`,
        description: `최근 5개년 에너지 원자재 가격과 탄소 가격 간의 다중회귀모형을 수립하고 결정계수(R²) 및 잔차 검정 수행`,
        status: 'in_progress',
        keyCompetency: '진로역량 (계량 통계 검증 및 정책 리스크 예측)',
        linkedSubject: '확률과 통계',
      },
      {
        id: `road-${student.id}-5`,
        gradeSemester: '3학년 1학기',
        stage: '융합 발전기',
        category: '진로탐색',
        title: `사회문제 탐구 / 생활과 윤리: 기후 불평등 해소를 위한 탄소 배당제 및 정의로운 전환(Just Transition) 정책 제언`,
        description: `취약 계층의 에너지 비용 부담 완화를 위한 세수 환급 모델을 설계하고 지자체 조례안 수준의 정책 건의서 작성`,
        status: 'planned',
        keyCompetency: '융합발전역량 (환경 정의 및 실천적 공공 거버넌스 기획)',
        linkedSubject: '사회문제 탐구',
      },
    ];
  }

  // Default / Law / Social / Humanities
  return [
    {
      id: `road-${student.id}-1`,
      gradeSemester: '1학년 1학기',
      stage: '기초 탐색기',
      category: '교과세특',
      title: `통합사회 / 공통국어: ${cleanInterest.slice(0, 24)} 관련 기본권 충돌과 쟁점 텍스트 분석`,
      description: `헌법상 기본권 조항과 언론 보도 텍스트를 독해하며 첨단 사회 쟁점 속 이해관계자 갈등의 핵심 쟁점 도출`,
      status: 'completed',
      keyCompetency: '학업역량 (비판적 문해력 및 헌법적 가치 탐색)',
      linkedSubject: '통합사회',
    },
    {
      id: `road-${student.id}-2`,
      gradeSemester: '1학년 2학기',
      stage: '기초 탐색기',
      category: '동아리',
      title: `시사토론동아리: 툴민(Toulmin) 논증 모형을 적용한 사설 3편 타당성 분해 및 모의 공청회 기획`,
      description: `주장, 데이터, 워런트 분석틀로 언론의 프레이밍을 비판적으로 검토하고 학급 구성원 대상 찬반 토론 주도`,
      status: 'completed',
      keyCompetency: '진로역량 (논리적 의사소통 및 공공 쟁점 조율)',
      linkedSubject: '동아리활동',
    },
    {
      id: `road-${student.id}-3`,
      gradeSemester: '2학년 1학기',
      stage: '심화 탐구기',
      category: '교과세특',
      title: `정치와 법 / 독서: ${cleanInterest.slice(0, 26)} 관련 과잉금지의 원칙과 사법 심사 기준 고찰`,
      description: `헌법 제37조 제2항의 4단계 비례성 원칙을 적용하여 신기술 도입 조례안의 법익 균형성과 침해 최소성을 법리 분석`,
      status: 'completed',
      keyCompetency: '학업역량 (법학적 논증 및 기본권 보장 체계 심화 연구)',
      linkedSubject: '정치와 법',
    },
    {
      id: `road-${student.id}-4`,
      gradeSemester: '2학년 2학기',
      stage: '심화 탐구기',
      category: '교과세특',
      title: `사회·문화 / 통계: ${cleanInterest.slice(0, 28)}에 관한 표본 편향성 검증 및 청소년 인식 설문 분석`,
      description: `자발적 참여 편향을 통제한 설문조사를 설계하여 100명 대상 실증 데이터를 분석하고 정책 수용성 지표 산출`,
      status: 'in_progress',
      keyCompetency: '진로역량 (양적 연구 방법론 및 사회조사 실무력)',
      linkedSubject: '사회·문화',
    },
    {
      id: `road-${student.id}-5`,
      gradeSemester: '3학년 1학기',
      stage: '융합 발전기',
      category: '진로탐색',
      title: `생활과 윤리 / 심화영어: 롤스의 정의론 및 글로벌 가이드라인 비교를 통한 미래 사회 거버넌스 제언`,
      description: `최소 수혜자 배려 관점에서 국내외 규제 조례안을 대조하고, 영문 정책 요약서(Policy Brief) 완성`,
      status: 'planned',
      keyCompetency: '융합발전역량 (글로벌 규범 비교 및 실천적 자치 조례 기안)',
      linkedSubject: '생활과 윤리',
    },
  ];
}

// 2. Generate 3 Comprehensive Tailored Inquiry Activity Records based on student's profile
export function generateTailoredInquiryRecords(student: Student): InquiryActivityRecord[] {
  const domain = detectStudentDomain(student);
  const cleanInterest = student.mainInterestTopic || '교과 연계 첨단 기술 쟁점';
  const targetCareer = student.targetCareer || '전문 연구원';
  const targetMajor = student.targetMajor || '자연과학/공학 계열';

  if (domain.isGeographyOrUrban) {
    return [
      {
        id: `act-${student.id}-1`,
        studentId: student.id,
        title: `[수학] 정적분을 이용한 로렌츠 곡선 모델링과 광역 거점별 의료·문화 인프라 공간 불평등(지니계수) 정량 분석`,
        subject: '수학 (수학Ⅱ / 미적분)',
        category: '교과세특',
        gradeSemester: '2학년 1학기',
        date: '2026-05-19',
        motivation: `수학 수업에서 '정적분을 활용한 두 곡선 사이의 넓이 구하기'를 학습한 후, 교과서의 로렌츠 곡선 소단원을 보고 국가 간 소득 불평등뿐 아니라 국토 공간 내 필수 인프라(상급종합병원, 대중교통 거점) 접근성 격차 역시 지니계수로 정량 측정할 수 있겠다는 아이디어를 떠올림. 통계청 e-지방지표 공공데이터를 수집하여 수도권과 비수도권 간의 공간 불평등도를 직접 수치화하고자 탐구를 기획함.`,
        process: `1. KOSIS에서 전국 229개 시군구별 인구 누적 비율(x)과 상급종합병원 병상 수 누적 비율(y) 데이터를 수집함.\n2. 수집된 산점도 데이터를 엑셀 최소제곱법 및 다항 회귀식 y = a*x^b (멱함수 모델)로 곡선 피팅함.\n3. 완전 균등 대각선 y = x와 피팅 곡선 사이의 면적을 정적분 ∫[0 to 1] (x - a*x^b) dx 공식을 통해 계산하여 공간 지니계수(Gini Coefficient) 0.612를 도출함.`,
        insights: `단순히 '지방에 병원이 부족하다'는 정성적 주장을 넘어, 정적분을 통해 0부터 1 사이의 객관적 지수로 불평등의 심각성을 엄밀하게 입증할 수 있음을 체감함. 수학이 현실 사회의 공간적 불균형을 진단하고 합리적인 공공자원 배분 정책을 세우는 데 강력한 의사결정 도구가 됨을 깨달음.`,
        relatedBooks: '《지도의 배신》(마크 몬모니어), 《도시의 승리》(에드워드 글레이저), 《미적분의 힘》(스티븐 스트로가츠)',
        deliverables: '정적분 활용 공간 불평등 지니계수 산출 수리 모델링 보고서 (A4 5매), 지오지브라 적분 시각화 차트',
        status: 'reviewed',
        teacherFeedback: {
          author: '박정우 교사 (수학과 / 2학년 부장)',
          date: '2026-05-23',
          academicCompetency: '정적분의 기하학적 정의(두 곡선 사이의 넓이)를 인프라 분포 실측 데이터의 로렌츠 곡선 피팅에 정확히 접목하여 지니계수를 연산해낸 뛰어난 수리적 모델링 능력이 돋보임.',
          careerCompetency: '도시계획 및 공간정보 분야의 핵심 난제인 지역 격차를 객관적 수치로 가시화하여 논리적 설득력을 극대화한 전공 적합성이 매우 탁월함.',
          communityCompetency: '수학적 지식을 공공의료 사각지대 해소와 소외 지역 거주민의 기본권 보장이라는 공익적 쟁점에 투영하는 성숙한 시민의식을 지님.',
          coachingAdvice: '다음 학기에는 공간적 접근성을 더 정밀하게 반영하기 위해 유클리드 직선거리 대신 도로망 네트워크 거리(GIS Distance) 기반 가중치를 추가 모델링해보길 권함.',
          draftRecord: '정적분 단원에서 로렌츠 곡선과 완전 균등 대각선 사이의 면적 공식을 활용하여 전국 229개 시군구의 필수 인프라 접근성 불평등 지수를 정량 산출함. 공공데이터를 멱함수로 회귀 피팅한 뒤 정적분 연산으로 공간 지니계수(0.612)를 도출하고, 이를 바탕으로 거점형 공공인프라 재배치 정책의 수학적 타당성을 논증함.',
        },
      },
      {
        id: `act-${student.id}-2`,
        studentId: student.id,
        title: `[한국지리 / 정보] QGIS 공간 버퍼(Buffer) 및 네트워크 분석을 통한 지방 중소도시 대중교통 소외지역 및 의료 골든타임 사각지대 도출`,
        subject: '한국지리 / 사회탐구',
        category: '동아리활동',
        gradeSemester: '2학년 1학기',
        date: '2026-06-12',
        motivation: `한국지리 수업의 '도시 내부 구조와 서비스 권역' 단원을 학습하며, 자가용이 없는 고령층 주민들이 병원에 방문하기 위해 대중교통으로 1시간 이상 소요되는 교통 소외 현상에 문제의식을 가짐. 지리정보시스템(GIS)과 공공 공간데이터를 활용하여 실제 이동 시간에 기반한 의료 골든타임 사각지대를 지도로 시각화하고 대안 노선을 제안하고자 함.`,
        process: `1. 국가공통공공데이터 포털에서 지방 A시의 버스정류장 위치, 배차 간격, 종합병원 좌표 GeoJSON 데이터를 수집함.\n2. 오픈소스 GIS 소프트웨어인 QGIS를 설치하고 버스정류장 반경 500m 보행 권역 버퍼(Buffer)를 생성하여 대중교통 결핍 주거구역을 추출함.\n3. 응급의료 취약지 레이어와 취약계층 밀집 행정동을 중첩(Overlay) 분석하여 배차 간격 60분 이상인 정류장 인근 거주민의 취약성을 시각화한 주제도를 제작함.`,
        insights: `행정구역 경계선 기준의 통계가 숨기고 있던 실제 '생활권 내 공간적 격리' 현상을 지도 위에서 직접 확인하며 공간 데이터 기반 의사결정의 위력을 실감함. 단순 노선 증차보다 수요응답형 버스(DRT)와 같은 맞춤형 모빌리티가 지방 소멸 대응에 필수적임을 깨달음.`,
        relatedBooks: '《지리의 힘》(팀 마샬), 《공간이 사람을 만든다》(유현준)',
        deliverables: 'QGIS 기반 대중교통 소외지역 공간 분석 주제도 및 수요응답형 교통(DRT) 노선 제안서',
        status: 'reviewed',
        teacherFeedback: {
          author: '최민석 교사 (지리과 / 진로지도)',
          date: '2026-06-16',
          academicCompetency: '지리 교과의 중심지 권역 이론을 QGIS 공간 버퍼 중첩 기법에 능숙하게 적용하여 실증적 주제도를 완성한 뛰어난 공간정보 활용 능력을 보임.',
          careerCompetency: '도시·지역계획 연구에 필요한 오픈소스 도구와 공간 빅데이터 처리 역량을 고교 수준 이상으로 주도적으로 체득함.',
          communityCompetency: '교통 약자의 기본 이동권 보장이라는 지역 복지 현안에 깊은 공감대를 형성하고 실현 가능한 정책 대안을 설계함.',
          coachingAdvice: '작성한 QGIS 프로젝트 데이터를 바탕으로 실제 지방자치단체 열린신문고 또는 청소년 정책 제안 대회에 출품하면 더 큰 성장이 기대됨.',
          draftRecord: '지리정보시스템(QGIS)을 자율적으로 익혀 공공데이터포털의 정류장 좌표와 응급의료기관 위치 데이터를 결합하고 반경 500m 보행 버퍼 및 중첩 분석을 수행함. 대중교통 배차 간격과 노인 인구 밀집도를 교차 분석하여 의료 사각지대 주제도를 제작하고, 수요응답형 버스(DRT) 도입을 골자로 한 교통 약자 이동권 보장 정책 제안서를 완성함.',
        },
      },
      {
        id: `act-${student.id}-3`,
        studentId: student.id,
        title: `[생활과 윤리 / 독서] 롤스의 정의론과 르페브르의 '도시권(Right to the City)' 관점에서 본 젠트리피케이션과 공간 정의(Spatial Justice) 고찰`,
        subject: '생활과 윤리 / 독서',
        category: '진로활동',
        gradeSemester: '2학년 2학기',
        date: '2026-10-08',
        motivation: `생활과 윤리에서 롤스의 '차등의 원칙'과 노직의 '소유 권리론'의 정의관을 배운 뒤, 원도심 재생 사업으로 상권이 활성화되자 정작 기존에 터전을 가꾸어 온 임차 상인과 원주민이 치솟은 임대료 때문에 밀려나는 젠트리피케이션 현상에 깊은 윤리적 딜레마를 느낌. 공간의 사용가치와 교환가치의 대립을 철학적·윤리적으로 규명하고 상생 조례안의 방향성을 모색하고자 탐구를 진행함.`,
        process: `1. 앙리 르페브르(Henri Lefebvre)의 '도시권(Right to the City)' 개념과 데이비드 하비(David Harvey)의 공간 정의론 관련 학술 논문 요약본을 독해함.\n2. 국내 대표 상권(성수동, 을지로 등)의 임대료 상승률 추이와 지방자치단체 '지역상생협력 조례'의 실제 이행률 통계를 대조 분석함.\n3. 롤스의 무지의 베일(Veil of Ignorance) 장치를 가상 시뮬레이션하여 가장 불리한 위치의 임차 상인의 권익을 제도적으로 담보하는 상생 임대 협약 표준안을 설계함.`,
        insights: `도시 공간이 단순히 부동산 자산(교환가치)으로만 환원될 때 공동체의 유대와 역사적 장소성(사용가치)이 파괴된다는 점을 이해함. 진정한 발전이란 외형적 지가 상승이 아니라 사회적 약자가 공간에서 배제되지 않고 지속 가능한 삶을 영위할 수 있는 공간적 정의가 구현될 때 달성된다는 신념을 정립함.`,
        relatedBooks: '《정의란 무엇인가》(마이클 샌델), 《반란의 도시》(데이비드 하비), 《도시는 누구의 것인가》(사스키아 사센)',
        deliverables: '공간 정의론 기반 상생 협약 및 임차 상인 공간권 보장 조례안 검토 보고서',
        status: 'submitted',
        teacherFeedback: {
          author: '김현아 교사 (윤리와 사상 / 윤리과)',
          date: '2026-10-15',
          academicCompetency: '롤스의 차등의 원칙을 르페브르의 공간 철학과 결합하여 도시 재개발의 그늘을 인문학적으로 깊이 있게 성찰해낸 탁월한 비판적 융합 독서 역량이 돋보임.',
          careerCompetency: '도시 행정 및 공공 정책 입안자가 지녀야 할 인문학적 감수성과 윤리적 철학의 중요성을 명확히 인식함.',
          communityCompetency: '급속한 개발 이익 이면에 소외되는 사회적 약자의 목소리에 귀 기울이고 제도적 연대 방안을 진지하게 고민함.',
          coachingAdvice: '국내 조례에 그치지 않고 독일 베를린의 임대료 상한제(Mietendeckel) 등 해외 사례의 위헌 판결 쟁점을 보강하면 더욱 설득력 있는 보고서가 될 것임.',
          draftRecord: '생활과 윤리 수업 중 배운 분배 정의 이론을 현대 도시 공간 갈등에 적용하여, 롤스의 차등의 원칙과 르페브르의 도시권(Right to the City) 개념을 바탕으로 젠트리피케이션의 윤리적 쟁점을 심층 분석함. 원도심 임대료 급등 통계와 지자체 상생 조례를 검토하고, 공간의 교환가치보다 주민의 장소성과 주거권을 우선시하는 공간 정의 실현 정책 제안서를 주도적으로 작성함.',
        },
      },
    ];
  }

  if (domain.isBio) {
    return [
      {
        id: `act-${student.id}-1`,
        studentId: student.id,
        title: `[확률과 통계] 베이즈 정리 기반 CRISPR-Cas9 가이드 RNA 오프타깃 절단 확률 모델링`,
        subject: '수학 (확률과 통계 / 미적분)',
        category: '교과세특',
        gradeSemester: '2학년 1학기',
        date: '2026-05-18',
        motivation: `생명과학 수업에서 CRISPR-Cas9 유전자 가위가 난치병 유전자를 교정하는 원리를 배운 뒤, 30억 쌍의 인간 유전체 서열 중 가이드 RNA가 1~2개 염기 불일치를 오인하여 엉뚱한 DNA를 자르는 '오프타깃(Off-target)' 부작용에 큰 의문을 품음. 교과서에서 배운 조건부 확률 P(A|B)과 베이즈 정리를 실제 유전자 교정 검사의 위양성(False Positive) 판별에 접목하여 수학적으로 오차율을 계산해보고자 주도적으로 탐구를 기획함.`,
        process: `1. KCI 선행 논문 2편을 분석하여 가이드 RNA 20-mer 서열 중 PAM 인접 시드 영역(Seed Region)의 염기 불일치 개수별 결합 해리 상수(Kd) 데이터를 추출함.\n2. 실제 유전 질환 보인자 유병률(0.001)과 진단 키트의 민감도(99%), 특이도(98%)를 대입하여 양성 결과가 나왔을 때 실제 표적만 정확히 절단되었을 사후 확률을 베이즈 공식으로 수식화함.\n3. 지오지브라 슬라이더 기능과 엑셀 시뮬레이션을 활용하여 불일치 염기 위치에 따른 절단 확률 감쇄 곡선을 시각화하고 잔차 제곱합(RSS)을 계산함.`,
        insights: `생명공학의 정밀 치료 기술이 실험실의 감에 의존하는 것이 아니라 엄밀한 수학적 조건부 확률과 오차 분석에 기반함을 깨달음. 특히 사전 확률이 매우 희박한 희귀 질환일수록 위양성 오류가 급증한다는 베이즈 역설을 직접 수식으로 증명하며, 생명공학자에게 요구되는 데이터 해석 역량의 중요성을 깊이 체감함.`,
        relatedBooks: '《통계의 미학》(최제호), 《유전자 편집의 시대》(제니퍼 다우드나)',
        deliverables: '베이즈 추론 수리 모델링 연구 보고서 (A4 5매), 지오지브라 조건부 확률 워크시트',
        status: 'reviewed',
        teacherFeedback: {
          author: '강수진 교사 (진로진학부장 / 통합과학)',
          date: '2026-05-22',
          academicCompetency: '조건부 확률과 베이즈 정리를 의생명 첨단 난제인 오프타깃 오류 검증에 완벽히 매핑하여 수식화해낸 뛰어난 수리적 추론력과 학업 성실성이 돋보임.',
          careerCompetency: '희망 전공인 의생명과학 분야의 최신 논문 데이터를 주도적으로 발굴하고 수치적으로 오차 한계를 검증하는 연구자적 기량이 탁월함.',
          communityCompetency: '탐구 결과를 학급 급우들이 이해하기 쉬운 지오지브라 시각화 그래프로 제작하여 공유하는 열린 학문적 태도를 보임.',
          coachingAdvice: '김민서 학생, 수학과 생명과학을 결합한 매우 모범적인 세특 탐구입니다. 2학기 생명과학Ⅱ에서는 이 확률적 오차를 최소화하기 위해 고안된 High-fidelity Cas9 단백질의 3차원 입체 구조 변이 메커니즘으로 연구를 자연스럽게 이어가길 권합니다.',
          draftRecord: `확률과 통계 교과에서 조건부 확률과 베이즈 정리의 실생활 적용 가능성에 깊은 지적 호기심을 발휘함. 유전자 교정 기술인 CRISPR-Cas9의 비표적 절단(오프타깃) 부작용에 주목하여, 가이드 RNA의 염기 불일치에 따른 결합 해리 상수 데이터를 바탕으로 사후 절단 확률을 정밀 수식화함. 지오지브라 소프트웨어를 활용하여 매개변수 변동에 따른 민감도 곡선을 직접 도출하고 급우들에게 명쾌하게 발표함. 추상적인 수학 공식을 첨단 바이오 쟁점에 결합하여 오차를 논리적으로 규명해내는 우수한 학업 역량과 자기주도적 연구 소양을 갖춘 학생임.`,
        },
      },
      {
        id: `act-${student.id}-2`,
        studentId: student.id,
        title: `[생활과 윤리] 배아 유전자 치료의 윤리적 한계와 공공 거버넌스 가이드라인 제언`,
        subject: '사회 (생활과 윤리 / 정치와 법)',
        category: '교과세특',
        gradeSemester: '2학년 2학기',
        date: '2026-09-14',
        motivation: `유전 질환 치료를 위한 유전자 가위 기술이 체세포를 넘어 생식세포 및 배아 단계로 확장될 때 발생하는 '맞춤아기(Designer Baby)'의 윤리적 딜레마를 접함. 롤스의 정의론과 칸트의 의무론을 바탕으로 과학 기술의 발전이 인간 존엄성을 침해하지 않도록 통제하는 합리적 법률 가이드라인을 연구하고자 함.`,
        process: `1. 칸트의 인간 목적주의와 롤스의 차등 원칙을 비교하여, 유전적 불평등이 계층 고착화로 이어지는 시나리오를 분석함.\n2. 한국의 《생명윤리 및 안전에 관한 법률》 제47조와 영국의 인간수정배아관리청(HFEA) 조례 조문을 비교 분석표로 정리함.\n3. 학급 모의 공청회에서 정책 입안자 역할을 맡아 '중증 난치 질환에 한정한 한시적 승인제' 조례 초안을 발표함.`,
        insights: `과학 기술의 순수한 진보 열망이 사회적 약자 보호와 윤리적 성찰을 동반하지 않을 때 위험한 디스토피아를 초래할 수 있음을 배움. 전공 지식뿐만 아니라 사회적 소통과 윤리적 책임 의식을 갖춘 바이오 연구자가 되겠다는 다짐을 굳힘.`,
        relatedBooks: '《정의란 무엇인가》(마이클 샌델), 《맞춤인간이 오고 있다》(프랑수아 이리냐크)',
        deliverables: '생명윤리 법령 비교 분석 보고서 (A4 4매), 학급 모의 공청회 제안서',
        status: 'submitted',
      },
      {
        id: `act-${student.id}-3`,
        studentId: student.id,
        title: `[통합과학/동아리] 제한효소 처리 및 아가로스 겔 전기영동을 통한 DNA 절단 확인 실험`,
        subject: '과학 (통합과학 / 과학실험동아리)',
        category: '동아리활동',
        gradeSemester: '1학년 2학기',
        date: '2025-11-20',
        motivation: `교과서 삽화로만 보던 DNA 이중나선 절단 과정을 교내 실험실에서 직접 검증하고, 실험 과정에서 발생하는 물리화학적 변인(전압, 버퍼 농도)이 밴드 이동도에 미치는 영향을 정량적으로 규명하고자 동아리 팀 프로젝트로 기획함.`,
        process: `1. 대장균 플라스미드 DNA를 추출하고 EcoRI, HindIII 제한효소를 처리하여 37도 항온 수조에서 1시간 반응시킴.\n2. 1.0% 아가로스 겔을 직접 제작하고 TAE 버퍼 내에서 100V 전압으로 35분간 전기영동을 진행함.\n3. UV 트랜스일루미네이터로 염색 밴드를 관찰하고, DNA 마커의 염기쌍 크기와 이동 거리의 반비례 관계를 로그 그래프로 플로팅함.`,
        insights: `실험실 매뉴얼대로 수행하더라도 겔 농도의 미세한 불균일이나 버퍼 온도 상승으로 인해 밴드가 휘어지는 스마일링(Smiling) 현상을 겪으며, 엄격한 변인 통제와 정밀한 피펫팅의 중요성을 체득함.`,
        relatedBooks: '《인간 유전체 프로젝트의 비밀》, 《실험실 안전 매뉴얼》',
        deliverables: '실험 보고서, 이동 거리 로그 회귀분석 그래프',
        status: 'reviewed',
      },
    ];
  }

  if (domain.isAi) {
    return [
      {
        id: `act-${student.id}-1`,
        studentId: student.id,
        title: `[인공지능 수학] 트랜스포머 Self-Attention의 행렬 연산과 소프트맥스 안정화 수식 분석`,
        subject: '수학 (인공지능 수학 / 기하)',
        category: '교과세특',
        gradeSemester: '2학년 1학기',
        date: '2026-05-25',
        motivation: `ChatGPT 등 거대 언어 모델(LLM)이 인간의 언어 맥락을 파악하는 핵심 알고리즘인 트랜스포머의 수식적 기초를 인공지능 수학 수업 시간에 배운 행렬과 벡터 내적 개념으로 직접 파헤쳐보고자 함. 특히 차원 수 dk가 커질 때 소프트맥스 함수의 기울기 소실(Vanishing Gradient)을 방지하기 위해 왜 루트 dk로 나누어주는지 수학적으로 증명하고자 함.`,
        process: `1. Query, Key, Value 3개 벡터가 내적(Dot Product)을 통해 유사도를 계산하는 수학적 과정을 벡터 공간에서 기하학적으로 도식화함.\n2. 정규분포를 따르는 두 독립 확률변수의 내적 분산이 dk가 됨을 확률 통계 이론으로 증명하여 스케일링 팩터의 당위성을 유도함.\n3. 가상의 3단어 문장 임베딩 행렬을 정의하고 파이썬 NumPy로 Scaled Dot-Product Attention 행렬을 직접 연산하여 히트맵으로 시각화함.`,
        insights: `추상적으로 느껴지던 최첨단 인공지능 기술의 본질이 결국 고등학교 수준의 행렬 곱과 벡터의 정사영, 코사인 유사도의 연속적 계산임을 깨닫고 수학의 강력함을 실감함. 소프트웨어의 효율성은 탄탄한 수리적 최적화에서 출발함을 배움.`,
        relatedBooks: '《딥러닝을 위한 수학》(프리렉), 《Attention Is All You Need》(논문 원문)',
        deliverables: 'Self-Attention 연산 Jupyter Notebook 코드, 수리 유도 리포트 (A4 5매)',
        status: 'reviewed',
        teacherFeedback: {
          author: '강수진 교사 (진로진학부장 / 통합과학)',
          date: '2026-05-28',
          academicCompetency: '소프트맥스 함수에서의 기울기 소실 원인을 행렬 분산의 관점에서 수리적으로 증명해낸 집요한 논리력이 매우 돋보임.',
          careerCompetency: '인공지능 핵심 논문의 수식을 회피하지 않고 직접 파이썬 코드로 구현하여 검증하는 예비 공학자로서의 실천력이 뛰어남.',
          communityCompetency: '급우들이 어려워하는 행렬 연산 과정을 시각화 히트맵으로 알기 쉽게 공유하여 학급의 학업 분위기를 고양시킴.',
          coachingAdvice: '이준호 학생, 훌륭한 탐구입니다. 2학기에는 이 행렬 연산이 실제 GPU 하드웨어에서 처리될 때 메모리 대역폭 병목이 왜 발생하는지 물리학/정보 교과와 연계하여 하드웨어 가속기(TPU/NPU) 아키텍처 탐구로 확장해 보세요.',
          draftRecord: `인공지능 수학 교과에서 트랜스포머 모델의 핵심 알고리즘인 Scaled Dot-Product Attention을 주도적으로 탐구함. Q, K, V 벡터의 내적 연산과 차원 수에 따른 소프트맥스 기울기 소실 문제를 확률 분포의 분산 관점에서 수학적으로 엄밀하게 증명함. 파이썬 라이브러리를 활용해 가상의 텍스트 임베딩 행렬을 생성하고 어텐션 가중치 히트맵을 직접 시각화하여 급우들에게 발표함. 추상적인 딥러닝 개념을 명쾌한 수리적 모델로 해석하고 구현해내는 우수한 컴퓨팅 사고력과 탐구 역량을 갖춤.`,
        },
      },
      {
        id: `act-${student.id}-2`,
        studentId: student.id,
        title: `[정보 / 인공지능 기초] 검색 증강 생성(RAG) 파이프라인의 벡터 유사도 검색 및 환각 저감 분석`,
        subject: '정보 · 인공지능 기초',
        category: '교과세특',
        gradeSemester: '2학년 2학기',
        date: '2026-09-20',
        motivation: `LLM이 허위 사실을 지어내는 환각(Hallucination) 현상을 극복하기 위해 최신 산업계에서 널리 쓰이는 RAG 기술에 흥미를 느낌. 문서 분할(Chunking) 크기와 코사인 유사도 임계치 설정이 검색 정확도와 모델 응답 신뢰도에 미치는 트레이드오프를 계량 분석하고자 함.`,
        process: `1. 학교 생활 규정집 PDF 문서를 200자, 500자, 1000자 크기로 청킹하고 임베딩 벡터를 추출함.\n2. 질문 쿼리와 문서 청크 간의 코사인 유사도(Cosine Similarity)를 계산하여 상위 3개 문맥을 LLM 프롬프트에 주입함.\n3. 사실 정확도(Factuality Score)를 정량 채점하여 최적의 청크 크기와 검색 임계값을 산출함.`,
        insights: `인공지능 모델의 성능이 단순히 모델의 파라미터 크기뿐만 아니라 정교한 데이터 전처리와 검색 알고리즘의 파이프라인 설계에 크게 좌우됨을 실증적으로 확인함.`,
        relatedBooks: '《인공지능 챗봇을 위한 검색 증강 기술》, 《빅데이터 분석 실무》',
        deliverables: 'RAG 파이프라인 벤치마크 코드, 청크 크기별 성능 비교 차트',
        status: 'submitted',
      },
      {
        id: `act-${student.id}-3`,
        studentId: student.id,
        title: `[정보] 퀵 정렬과 병합 정렬 알고리즘의 시간 복잡도(Big-O) 측정 및 시뮬레이션`,
        subject: '정보',
        category: '교과세특',
        gradeSemester: '1학년 1학기',
        date: '2025-06-12',
        motivation: `교과서에서 O(n²)인 버블 정렬 대비 O(n log n)인 퀵 정렬과 병합 정렬이 왜 대용량 데이터 처리에 필수적인지 실행 시간 측정 코드로 직접 증명하고자 함.`,
        process: `1. 파이썬 timeit 모듈로 1,000개에서 100,000개까지의 정렬되지 않은 난수 배열을 생성함.\n2. 세 가지 정렬 알고리즘의 실행 시간을 10회 반복 측정하여 평균값과 분산을 계산함.\n3. 이미 정렬된 역순 데이터가 주어졌을 때 퀵 정렬의 피벗(Pivot) 선택 문제로 시간 복잡도가 O(n²)으로 퇴화하는 최악의 케이스를 실험으로 입증함.`,
        insights: `알고리즘의 이론적 성능과 실제 입력 데이터의 분포 특성 간의 괴리를 발견함. 최적의 소프트웨어를 만들기 위해서는 수학적 시간 복잡도뿐만 아니라 데이터의 특성을 고려한 피벗 선택 전략이 필수적임을 배움.`,
        relatedBooks: '《알고리즘 산책》(이광근), 《누구나 자료구조와 알고리즘》(제이 웬그로우)',
        deliverables: '알고리즘 벤치마크 파이썬 코드, 실행 시간 비교 그래프 리포트',
        status: 'reviewed',
      },
    ];
  }

  // Default / Engineering / Econ / Social / Humanities
  return [
    {
      id: `act-${student.id}-1`,
      studentId: student.id,
      title: `[사회/수학] ${cleanInterest.slice(0, 24)}의 시장 실패 원인 분석과 피구세 최적 세율 수리 모델링`,
      subject: '사회 (경제 / 통합사회 / 수학Ⅱ)',
      category: '교과세특',
      gradeSemester: '2학년 1학기',
      date: '2026-05-20',
      motivation: `교과서에서 배운 외부효과와 시장 실패 이론이 현대 산업 현장의 핵심 쟁점인 '${cleanInterest}' 문제에 어떻게 적용되는지 지적 호기심을 가짐. 특히 단순 조세 부과를 넘어 미분계수를 활용한 비용함수 도출을 통해 사회적 후생 손실을 최소화하는 최적 정책 모델을 설계해보고자 함.`,
      process: `1. 공공 통계 포털에서 최근 5개년 관련 산업 데이터와 피해 비용 추계 자료를 추출함.\n2. 한계저감비용(MAC)과 한계피해비용(MD) 곡선을 2차 함수로 모델링하고 두 곡선의 교점을 도함수를 통해 수학적으로 산출함.\n3. 정책 도입 시 기업의 단기 설비 투자 부담과 중장기적 사회적 편익을 비교하는 비용편익분석(B/C) 표를 작성함.`,
      insights: `이상적인 경제 이론이 현실 정책으로 안착하기 위해서는 수리적 엄밀성과 함께 취약 계층을 배려하는 제도적 완충 장치가 병행되어야 함을 깨달음. 사회 문제를 데이터와 수학 공식으로 모델링하여 실질적 대안을 도출하는 융합적 분석력을 기름.`,
      relatedBooks: '《괴짜경제학》(스티븐 레빗), 《미적분의 힘》(스티븐 스트로가츠)',
      deliverables: '최적 세율 수리 모델링 연구 보고서 (A4 5매), 비용편익 산출 스프레드시트',
      status: 'reviewed',
      teacherFeedback: {
        author: '강수진 교사 (진로진학부장)',
        date: '2026-05-26',
        academicCompetency: '경제학의 외부성 개념을 수학의 미분계수 및 한계 개념과 유기적으로 결합하여 모델링한 고차 사고력이 돋보임.',
        careerCompetency: `'${targetCareer}'에 필요한 정량적 통계 데이터 가공 능력과 정책적 통찰을 자기주도적으로 증명함.`,
        communityCompetency: '정책 제안 시 산업계와 시민사회의 상생 방안을 균형 있게 고려한 성숙한 시민 의식을 지님.',
        coachingAdvice: `훌륭한 탐구입니다. 후속 연구로 실제 국내 지자체 조례안과 대조하여 실행 가능성을 검토하는 2단계 프로젝트를 권장합니다.`,
        draftRecord: `교과 학습 내용에 머무르지 않고 '${cleanInterest}'를 주제로 설정하여 자기주도적인 심화 융합 탐구를 수행함. 관련 개념을 다각도로 분석하여 핵심 질문에 대한 과학적·수리적 해결책을 도출하였으며, 비판적 사고력과 끈기 있는 탐구 태도를 보임. 탐구 성과를 논리정연하게 정리하여 교과와 진로를 아우르는 우수한 학업 역량을 입증함.`,
      },
    },
    {
      id: `act-${student.id}-2`,
      studentId: student.id,
      title: `[정치와 법] 신기술 도입에 따른 기본권 제한과 과잉금지의 원칙 법리 분석`,
      subject: '사회 (정치와 법)',
      category: '교과세특',
      gradeSemester: '2학년 2학기',
      date: '2026-09-18',
      motivation: `기술 혁신의 편리함 이면에 내재된 개인정보 침해 및 알고리즘 감시 문제를 헌법 제37조 제2항 과잉금지의 원칙 4단계(목적의 정당성, 수단의 적합성, 침해의 최소성, 법익의 균형성)로 검증하고자 함.`,
      process: `1. 관련 국내 법원 및 헌법재판소 판례 2건을 발췌하여 기본권 제한의 정당성 요건을 대조함.\n2. 해외 규제 샌드박스 가이드라인과 국내 법령 조문을 비교표로 작성함.\n3. 안전과 자유의 균형을 유지할 수 있는 4개 조항의 모의 자치 조례안을 완성함.`,
      insights: `법률이 기술 발전을 무조건 가로막는 장애물이 아니라, 기술이 사회적 신뢰 속에서 지속 가능하게 성장하도록 돕는 안전판 역할을 해야 함을 배움.`,
      relatedBooks: '《로봇 시대의 법과 윤리》, 《정의란 무엇인가》',
      deliverables: '판례 비교 평석 보고서 (A4 4매), 자치 조례안 초안',
      status: 'submitted',
    },
    {
      id: `act-${student.id}-3`,
      studentId: student.id,
      title: `[통합사회/동아리] 교내외 실태 설문조사를 통한 공공 정책 제안 프로젝트`,
      subject: '통합사회 / 동아리',
      category: '동아리활동',
      gradeSemester: '1학년 2학기',
      date: '2025-11-15',
      motivation: `일상에서 마주하는 사회적 문제의식을 구체화하고, 리커트 5점 척도 설문조사를 설계하여 학생 및 지역 주민의 실제 인식을 데이터로 검증하고자 함.`,
      process: `1. 구글 설문지를 활용하여 12개 문항으로 구성된 편향 없는 객관식 설문 설계함.\n2. 80명의 응답 데이터를 수집하여 엑셀 피벗테이블과 교차분석표로 정리함.\n3. 행동경제학적 넛지(Nudge) 디자인을 적용한 1장짜리 정책 홍보 인포그래픽 포스터를 제작함.`,
      insights: `설문 문항의 작은 어휘 차이도 응답자의 편향을 유도할 수 있음을 관찰하며 객관적 사회 과학 조사의 엄격성을 체득함.`,
      relatedBooks: '《넛지》(리처드 탈러), 《통계의 미학》',
      deliverables: '설문조사 통계표, 인포그래픽 정책 포스터',
      status: 'reviewed',
    },
  ];
}
