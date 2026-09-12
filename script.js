// 기본 시간대들
let timezones = [
    { id: 1, timezone: 'Asia/Seoul', name: '서울', emoji: '🇰🇷' },
    { id: 2, timezone: 'America/New_York', name: '뉴욕', emoji: '🗽' },
    { id: 3, timezone: 'Europe/London', name: '런던', emoji: '🇬🇧' },
    { id: 4, timezone: 'Asia/Tokyo', name: '도쿄', emoji: '🗾' }
];

let nextId = 5;

// 시간대 이름 매핑
const timezoneNames = {
    'UTC': '협정 세계시',
    'Asia/Seoul': '서울',
    'Asia/Tokyo': '도쿄',
    'Asia/Shanghai': '상하이',
    'Asia/Hong_Kong': '홍콩',
    'Asia/Bangkok': '방콕',
    'Asia/Singapore': '싱가포르',
    'Asia/Dubai': '두바이',
    'Asia/Kolkata': '인도',
    'Europe/London': '런던',
    'Europe/Paris': '파리',
    'Europe/Berlin': '베를린',
    'Europe/Moscow': '모스크바',
    'Africa/Cairo': '카이로',
    'Africa/Johannesburg': '요하네스버그',
    'America/New_York': '뉴욕',
    'America/Chicago': '시카고',
    'America/Denver': '덴버',
    'America/Los_Angeles': '로스앤젤레스',
    'America/Anchorage': '앵커리지',
    'Pacific/Honolulu': '호놀룰루',
    'America/Toronto': '토론토',
    'America/Mexico_City': '멕시코시티',
    'America/Sao_Paulo': '상파울루',
    'America/Buenos_Aires': '부에노스아이레스',
    'Australia/Sydney': '시드니',
    'Australia/Melbourne': '멜버른',
    'Pacific/Auckland': '오클랜드'
};

const emojiMap = {
    'Asia/Seoul': '🇰🇷',
    'Asia/Tokyo': '🗾',
    'Asia/Shanghai': '🇨🇳',
    'Asia/Hong_Kong': '🇭🇰',
    'Asia/Bangkok': '🇹🇭',
    'Asia/Singapore': '🇸🇬',
    'Asia/Dubai': '🇦🇪',
    'Asia/Kolkata': '🇮🇳',
    'Europe/London': '🇬🇧',
    'Europe/Paris': '🇫🇷',
    'Europe/Berlin': '🇩🇪',
    'Europe/Moscow': '🇷🇺',
    'Africa/Cairo': '🇪🇬',
    'Africa/Johannesburg': '🇿🇦',
    'America/New_York': '🗽',
    'America/Chicago': '🇺🇸',
    'America/Denver': '🇺🇸',
    'America/Los_Angeles': '🌴',
    'America/Anchorage': '🇺🇸',
    'Pacific/Honolulu': '🌺',
    'America/Toronto': '🇨🇦',
    'America/Mexico_City': '🇲🇽',
    'America/Sao_Paulo': '🇧🇷',
    'America/Buenos_Aires': '🇦🇷',
    'Australia/Sydney': '🇦🇺',
    'Australia/Melbourne': '🇦🇺',
    'Pacific/Auckland': '🇳🇿',
    'UTC': '🌍'
};

// 시간을 포맷팅 (HH:MM:SS)
function formatTime(date) {
    return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

// 날짜를 포맷팅 (YYYY-MM-DD)
function formatDate(date) {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 요일 가져오기
function getDayOfWeek(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
}

// 시간대별 시간 가져오기
function getTimeInTimezone(timezone) {
    const formatter = new Intl.DateTimeFormat('ko-KR', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const parts = formatter.formatToParts(new Date());
    const result = {};
    
    parts.forEach(part => {
        result[part.type] = part.value;
    });
    
    return {
        hour: result.hour,
        minute: result.minute,
        second: result.second,
        year: result.year,
        month: result.month,
        day: result.day
    };
}

// 시계 카드 생성
function createClockCard(tz) {
    const timeData = getTimeInTimezone(tz.timezone);
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][new Date().getDay()];
    
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
        <div class="clock-location">
            <div class="location-info">
                <h3>${emojiMap[tz.timezone] || '🌍'} ${tz.name}</h3>
                <p>${tz.timezone}</p>
            </div>
            <button class="remove-btn" onclick="removeTimezone(${tz.id})">제거</button>
        </div>
        <div class="digital-time">${timeData.hour}:${timeData.minute}:${timeData.second}</div>
        <div class="time-info">
            <div class="info-item">
                <div class="info-label">날짜</div>
                <div class="info-value">${timeData.month}/${timeData.day}</div>
            </div>
            <div class="info-item">
                <div class="info-label">요일</div>
                <div class="info-value">${dayOfWeek}요일</div>
            </div>
        </div>
    `;
    
    return card;
}

// 모든 시계 업데이트
function updateAllClocks() {
    const container = document.getElementById('clocksContainer');
    
    if (timezones.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🕐</div>
                <h2>시간대가 없습니다</h2>
                <p>+ 시간대 추가 버튼을 클릭하여 시간대를 추가하세요</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    timezones.forEach(tz => {
        container.appendChild(createClockCard(tz));
    });
}

// 시간대 추가 모달 열기
function showAddTimezone() {
    document.getElementById('addTimezoneModal').classList.add('show');
}

// 시간대 추가 모달 닫기
function closeAddTimezone() {
    document.getElementById('addTimezoneModal').classList.remove('show');
    document.getElementById('timezoneSelect').value = '';
}

// 시간대 추가
function addTimezone() {
    const select = document.getElementById('timezoneSelect');
    const timezone = select.value;
    
    if (!timezone) {
        alert('시간대를 선택해주세요');
        return;
    }
    
    // 중복 확인
    if (timezones.some(tz => tz.timezone === timezone)) {
        alert('이미 추가된 시간대입니다');
        return;
    }
    
    const name = timezoneNames[timezone] || timezone;
    timezones.push({
        id: nextId++,
        timezone: timezone,
        name: name,
        emoji: emojiMap[timezone] || '🌍'
    });
    
    // 로컬스토리지에 저장
    saveTimezones();
    
    updateAllClocks();
    closeAddTimezone();
}

// 시간대 제거
function removeTimezone(id) {
    timezones = timezones.filter(tz => tz.id !== id);
    saveTimezones();
    updateAllClocks();
}

// 검색 기능
function searchTimezone(query) {
    const filtered = timezones.filter(tz => 
        tz.name.toLowerCase().includes(query.toLowerCase()) ||
        tz.timezone.toLowerCase().includes(query.toLowerCase())
    );
    
    const container = document.getElementById('clocksContainer');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🔍</div>
                <h2>결과 없음</h2>
                <p>"${query}"와 일치하는 시간대가 없습니다</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    filtered.forEach(tz => {
        container.appendChild(createClockCard(tz));
    });
}

// 로컬스토리지에 저장
function saveTimezones() {
    localStorage.setItem('timezones', JSON.stringify(timezones));
}

// 로컬스토리지에서 불러오기
function loadTimezones() {
    const saved = localStorage.getItem('timezones');
    if (saved) {
        timezones = JSON.parse(saved);
        // nextId 업데이트
        if (timezones.length > 0) {
            nextId = Math.max(...timezones.map(tz => tz.id)) + 1;
        }
    }
}

// 초기화
function init() {
    loadTimezones();
    updateAllClocks();
    
    // 매 초마다 업데이트
    setInterval(updateAllClocks, 1000);
    
    // 검색 기능
    document.getElementById('searchInput').addEventListener('input', (e) => {
        if (e.target.value.trim() === '') {
            updateAllClocks();
        } else {
            searchTimezone(e.target.value);
        }
    });
    
    // 모달 닫기 (외부 클릭)
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('addTimezoneModal');
        if (e.target === modal) {
            closeAddTimezone();
        }
    });
}

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', init);