// 한국 도시들
const cities = [
    { name: '서울', emoji: '🏢' },
    { name: '부산', emoji: '🌊' },
    { name: '대구', emoji: '🏞️' },
    { name: '인천', emoji: '✈️' },
    { name: '광주', emoji: '🌲' },
    { name: '대전', emoji: '🔬' },
    { name: '울산', emoji: '🏭' },
    { name: '제주', emoji: '🏝️' }
];

// 시간을 포맷팅하는 함수 (HH:MM:SS)
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// 날짜를 포맷팅하는 함수 (M월 D일 요일)
function formatDate(date) {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];
    
    return `${month} ${day}일 ${dayOfWeek}`;
}

// 시계 카드 만들기
function createClockCard(city) {
    const now = new Date();
    const time = formatTime(now);
    const date = formatDate(now);
    
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
        <div class="city-emoji">${city.emoji}</div>
        <div class="city-name">${city.name}</div>
        <div class="digital-time" id="time-${city.name}">${time}</div>
        <div class="time-info" id="date-${city.name}">${date}</div>
    `;
    
    return card;
}

// 모든 시계 업데이트
function updateAllClocks() {
    cities.forEach(city => {
        const now = new Date();
        const time = formatTime(now);
        const date = formatDate(now);
        
        const timeElement = document.getElementById(`time-${city.name}`);
        const dateElement = document.getElementById(`date-${city.name}`);
        
        if (timeElement) timeElement.textContent = time;
        if (dateElement) dateElement.textContent = date;
    });
}

// 초기화
function init() {
    const container = document.getElementById('clocksContainer');
    
    cities.forEach(city => {
        container.appendChild(createClockCard(city));
    });
    
    // 매초마다 시간 업데이트
    setInterval(updateAllClocks, 1000);
}

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', init);