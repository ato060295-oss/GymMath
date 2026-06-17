const TIPS = {
    bmi: {
        'Дефицит массы': 'Рекомендуется увеличить калорийность рациона на 300-500 ккал. Добавьте силовые тренировки 3 раза в неделю для набора мышечной массы.',
        'Норма': 'Отличный результат. Поддерживайте текущий образ жизни и продолжайте следить за питанием.',
        'Избыток': 'Рекомендуется лёгкий дефицит калорий (минус 200-300 ккал). Добавьте кардио 3-4 раза в неделю по 30-40 минут.',
        'Ожирение': 'Рекомендуется начать с ходьбы 30 минут ежедневно и плавания. Исключите сахар и быстрые углеводы. Консультация врача обязательна.'
    },
    bmr: 'Для ускорения метаболизма: дробное питание 5-6 раз в день, достаточный сон 7-8 часов, силовые тренировки.',
    tdee: {
        default: 'Для похудения создавайте дефицит 15-20% от TDEE. Для набора массы — профицит 10-15%. Не опускайтесь ниже BMR.',
        sedentary: 'При сидячем образе жизни старайтесь проходить не менее 8000 шагов в день. Каждые 2 часа делайте 5-минутную разминку.',
        high: 'При высокой активности следите за восстановлением. Сон 8+ часов обязателен. Добавьте магний и омега-3 в рацион.'
    },
    bodyfat: {
        male: {
            low: 'Низкий процент жира. Поддерживайте результат сбалансированным питанием.',
            normal: 'Нормальный процент жира. Продолжайте в том же духе.',
            high: 'Повышенный процент жира. Добавьте кардио 3-4 раза в неделю. Уменьшите потребление простых углеводов.',
            obese: 'Высокий процент жира. Начните с ходьбы и плавания. Исключите сладкое и мучное. Консультация врача рекомендуется.'
        },
        female: {
            low: 'Низкий процент жира. Для женщин норма выше, чем у мужчин. Следите за гормональным фоном.',
            normal: 'Нормальный процент жира. Отличный результат.',
            high: 'Повышенный процент жира. Рекомендуется кардио и пересмотр рациона.',
            obese: 'Высокий процент жира. Начните с лёгкой активности и консультации диетолога.'
        }
    },
    ideal: 'Идеальный вес по формуле Робинсона — ориентир. Учитывайте также процент жира и мышечную массу. Не стремитесь к цифрам, если чувствуете себя хорошо.',
    whtr: {
        safe: 'WHtR в норме. Низкий риск сердечно-сосудистых заболеваний.',
        danger: 'WHtR повышен. Рекомендуется уменьшить окружность талии через кардио и питание. Цель — WHtR менее 0.5.'
    },
    water: 'Пейте воду равномерно в течение дня. При тренировках добавляйте 500 мл за час до и 200 мл каждые 20 минут во время занятия.',
    burn: 'Для максимального жиросжигания сочетайте кардио и силовые. После тренировки не голодайте — съешьте белок в течение 40 минут.',
    heart: {
        fat: 'Зона жиросжигания — оптимальна для длительных тренировок 40-60 минут. Держите пульс в этом диапазоне.',
        aerobic: 'Аэробная зона развивает выносливость. Тренируйтесь 30-40 минут 3 раза в неделю.',
        anaerobic: 'Анаэробная зона — для интервальных тренировок. Не более 20-30 минут. Требуется хорошая подготовка.'
    },
    maxRep: 'При работе с весами 80% от 1ПМ делайте 6-8 повторений. Для роста массы — 70-75% на 8-12 повторений. Всегда разминайтесь перед подходом.',
    running: {
        slow: 'Темп ниже 6 мин/км — хорошая аэробная нагрузка. Следите за техникой: приземляйтесь на середину стопы, корпус слегка вперёд.',
        medium: 'Темп 4-6 мин/км — развивает выносливость. Добавьте 1 интервальную тренировку в неделю для прогресса.',
        fast: 'Темп быстрее 4 мин/км — высокая нагрузка. Обязательно делайте разминку 15 минут и заминку. Следите за коленями и голеностопом.',
        joints: 'Для защиты суставов: бегайте по мягкому покрытию, меняйте кроссовки каждые 500-700 км. Добавьте упражнения на укрепление мышц стопы.'
    },
    deficit: {
        lose: 'Безопасный темп похудения — 0.5-1 кг в неделю. Быстрее не рекомендуется. Добавьте овощи в каждый приём пищи для объёма.',
        gain: 'Для набора массы ешьте с профицитом 300-500 ккал. Белок 1.8-2 г/кг. Тяжёлые базовые упражнения 3-4 раза в неделю.'
    }
};
// MET коэффициенты
const MET_VALUES = {
    'run-slow': 6.0,
    'run-medium': 9.8,
    'run-fast': 11.8,
    'power-heavy': 6.0,
    'power-cross': 8.0,
    'power-light': 3.5
};

// Чтение базовых параметров из профиля
function getBaseProfile() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('profile-age').value) || 0;
    const height = parseFloat(document.getElementById('profile-height').value) || 0;
    const weight = parseFloat(document.getElementById('profile-weight').value) || 0;
    const activity = parseFloat(document.getElementById('profile-activity').value) || 1.55;
    return { gender, age, height, weight, activity };
}

function showResult(id, text, tip) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = `<div class="result-text">${text}</div>` + (tip ? `<div class="result-tip">${tip}</div>` : '');
        el.style.display = 'block';
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function validateInput(value, min, max, fieldName) {
    if (isNaN(value) || value === 0) {
        alert(`Поле "${fieldName}" не заполнено или равно нулю`);
        return false;
    }
    if (value < min || value > max) {
        alert(`"${fieldName}" должно быть от ${min} до ${max}. Вы ввели: ${value}`);
        return false;
    }
    return true;
}

// 1. ИМТ
function calcBMI() {
    const { height, weight } = getBaseProfile();
    if (!validateInput(weight, 30, 300, 'Вес')) return;
    if (!validateInput(height, 100, 250, 'Рост')) return;
    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);
    let advice;
    if (bmi < 18.5) advice = "Дефицит массы";
    else if (bmi < 25) advice = "Норма";
    else if (bmi < 30) advice = "Избыток";
    else advice = "Ожирение";
    showResult('bmi-res', `ИМТ = ${bmi} (${advice})`, TIPS.bmi[advice]);
}

// 2. BMR + КБЖУ
function calcBMR() {
    const { gender, height, weight, age } = getBaseProfile();
    if (!validateInput(age, 10, 100, 'Возраст')) return;
    if (!validateInput(weight, 30, 300, 'Вес')) return;
    if (!validateInput(height, 100, 250, 'Рост')) return;
    const bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    const protein = Math.round(weight * 1.8);
    const fats = Math.round(weight * 0.9);
    const carbs = Math.round((bmr * 0.5) / 4);
    showResult('bmr-res', `BMR = ${Math.round(bmr)} ккал/день\nБелки ${protein} г | Жиры ${fats} г | Углеводы ${carbs} г`, TIPS.bmr);
}

// 3. TDEE
function calcTDEE() {
    const { gender, height, weight, age, activity } = getBaseProfile();
    if (!validateInput(age, 10, 100, 'Возраст')) return;
    if (!validateInput(weight, 30, 300, 'Вес')) return;
    if (!validateInput(height, 100, 250, 'Рост')) return;
    const bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = Math.round(bmr * activity);
    let tip = TIPS.tdee.default;
    if (activity <= 1.2) tip += '\n' + TIPS.tdee.sedentary;
    if (activity >= 1.725) tip += '\n' + TIPS.tdee.high;
    showResult('tdee-res', `Поддерживающая калорийность: ${tdee} ккал\nДля похудения: ~${Math.round(tdee * 0.85)} ккал\nДля набора: ~${Math.round(tdee * 1.1)} ккал`, tip);
}

// 4. Процент жира (Navy)
function calcBodyFat() {
    const { gender } = getBaseProfile();
    const height = parseFloat(document.getElementById('profile-height').value) || 0;
    const waist = parseFloat(document.getElementById('bf-waist').value) || 0;
    const neck = parseFloat(document.getElementById('bf-neck').value) || 0;
    const hip = gender === 'female' ? (parseFloat(document.getElementById('bf-hip').value) || 0) : 0;

    if (!validateInput(height, 100, 250, 'Рост')) return;
    if (!validateInput(waist, 40, 200, 'Талия')) return;
    if (!validateInput(neck, 20, 80, 'Шея')) return;
    if (gender === 'female' && !validateInput(hip, 40, 200, 'Бёдра')) return;

    let fat;
    if (gender === 'male') {
        fat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
        fat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }
    let level;
    if (gender === 'male') {
        if (fat < 10) level = 'low';
        else if (fat < 20) level = 'normal';
        else if (fat < 30) level = 'high';
        else level = 'obese';
    } else {
        if (fat < 18) level = 'low';
        else if (fat < 28) level = 'normal';
        else if (fat < 38) level = 'high';
        else level = 'obese';
    }
    showResult('bodyfat-res', `Процент жира: ${fat.toFixed(1)}%`, TIPS.bodyfat[gender][level]);
}

// 5. Идеальный вес
function calcIdealWeight() {
    const { gender } = getBaseProfile();
    const height = parseFloat(document.getElementById('profile-height').value) || 0;
    if (!validateInput(height, 100, 250, 'Рост')) return;
    const robinson = gender === 'male' ? 52 + 1.9 * (height - 152.4) : 49 + 1.7 * (height - 152.4);
    const imtMin = (18.5 * Math.pow(height / 100, 2)).toFixed(1);
    const imtMax = (24.9 * Math.pow(height / 100, 2)).toFixed(1);
    showResult('ideal-res', `Формула Робинсона: ${Math.round(robinson)} кг\nЗдоровый диапазон ИМТ: ${imtMin} - ${imtMax} кг`, TIPS.ideal);
}

// 6. WHtR
function calcWHtR() {
    const height = parseFloat(document.getElementById('profile-height').value) || 0;
    const waist = parseFloat(document.getElementById('whtr-waist').value) || 0;
    if (!validateInput(height, 100, 250, 'Рост')) return;
    if (!validateInput(waist, 40, 200, 'Талия')) return;
    const ratio = (waist / height).toFixed(2);
    const risk = ratio < 0.5 ? "Низкий риск" : "Повышенный риск (абдоминальное ожирение)";
    const tip = ratio < 0.5 ? TIPS.whtr.safe : TIPS.whtr.danger;
    showResult('whtr-res', `WHtR = ${ratio}\n${risk}\nРекомендуемая норма: < 0.5`, tip);
}

// 7. Вода
function calcWater() {
    const { weight } = getBaseProfile();
    if (!validateInput(weight, 30, 300, 'Вес')) return;
    const liters = (weight * 0.035).toFixed(1);
    showResult('water-res', `Норма воды: ${liters} л/день\n+0.5 л при интенсивной тренировке`, TIPS.water);
}

// 8. Расход MET
function calcExerciseBurn() {
    const { weight } = getBaseProfile();
    if (!validateInput(weight, 30, 300, 'Вес')) return;
    const duration = parseFloat(document.getElementById('ex-time').value) || 0;
    if (!validateInput(duration, 1, 600, 'Длительность')) return;
    const type = document.getElementById('ex-type').value;
    const met = MET_VALUES[type] || 5.0;
    const burned = Math.round(met * 3.5 * (weight / 200) * duration);
    showResult('ex-burn-res', `Сожжено примерно ${burned} ккал (MET = ${met})`, TIPS.burn);
}

// 9. Зоны пульса (Карвонен)
function calcHeart() {
    const { age } = getBaseProfile();
    if (!validateInput(age, 10, 100, 'Возраст')) return;
    const restHR = parseInt(document.getElementById('heart-restHR').value) || 0;
    if (!validateInput(restHR, 35, 120, 'Пульс покоя')) return;
    const maxHR = 220 - age;
    const reserve = maxHR - restHR;
    const z60 = Math.round(restHR + reserve * 0.6);
    const z70 = Math.round(restHR + reserve * 0.7);
    const z80 = Math.round(restHR + reserve * 0.8);
    const z90 = Math.round(restHR + reserve * 0.9);
    showResult('heart-res',
        `Макс. пульс: ${maxHR} уд/мин\nПульс покоя: ${restHR} уд/мин\n` +
        `Жиросжигание (60-70%): ${z60} - ${z70} уд/мин\n` +
        `Аэробная (70-80%): ${z70} - ${z80} уд/мин\n` +
        `Анаэробная (80-90%): ${z80} - ${z90} уд/мин`,
        TIPS.heart.fat + '\n' + TIPS.heart.aerobic + '\n' + TIPS.heart.anaerobic
    );
}

// 10. 1ПМ и рабочие веса
function calc1PM() {
    const liftWeight = parseFloat(document.getElementById('ep-weight').value) || 0;
    const liftReps = parseInt(document.getElementById('ep-reps').value) || 0;
    if (!validateInput(liftWeight, 1, 500, 'Поднятый вес')) return;
    if (!validateInput(liftReps, 1, 5, 'Повторения')) return;
    const oneRM = Math.round(liftWeight * (1 + liftReps / 30));
    const rep8 = Math.round(oneRM / (1 + 8 / 30));
    const rep10 = Math.round(oneRM / (1 + 10 / 30));
    const rep12 = Math.round(oneRM / (1 + 12 / 30));
    showResult('max-res', `1ПМ примерно ${oneRM} кг\nРабочие веса:\n  8 повт: ${rep8} кг\n10 повт: ${rep10} кг\n12 повт: ${rep12} кг`, TIPS.maxRep);
}

// 11. Темп бега
function calcRunningPace() {
    const runDist = parseFloat(document.getElementById('runDist').value) || 0;
    const runTime = parseFloat(document.getElementById('runTime').value) || 0;
    if (!validateInput(runDist, 0.1, 100, 'Дистанция')) return;
    if (!validateInput(runTime, 1, 1000, 'Время')) return;
    const paceMin = runTime / runDist;
    const paceSec = Math.round((paceMin % 1) * 60);
    const paceTotal = Math.floor(paceMin);
    const speed = (runDist / (runTime / 60)).toFixed(1);
    let tip;
    if (paceMin > 6) tip = TIPS.running.slow;
    else if (paceMin >= 4) tip = TIPS.running.medium;
    else tip = TIPS.running.fast;
    tip += '\n' + TIPS.running.joints;
    showResult('running-res', `Темп: ${paceTotal}:${String(paceSec).padStart(2, '0')} мин/км\nСкорость: ${speed} км/ч`, tip);
}

// 12. Дефицит/профицит и прогноз времени
function calcDeficit() {
    const p = getBaseProfile();
    if (!validateInput(p.age, 10, 100, 'Возраст')) return;
    if (!validateInput(p.weight, 30, 300, 'Вес')) return;
    if (!validateInput(p.height, 100, 250, 'Рост')) return;
    const goalKg = parseFloat(document.getElementById('deficit-goalKg').value) || 0;
    if (!validateInput(goalKg, 0.1, 50, 'Цель')) return;
    const goalType = document.getElementById('deficit-goalType').value;
    const bmr = p.gender === 'male' ? 10 * p.weight + 6.25 * p.height - 5 * p.age + 5 : 10 * p.weight + 6.25 * p.height - 5 * p.age - 161;
    const tdee = Math.round(bmr * p.activity);
    const kcalPerKg = 7700;
    const totalKcal = kcalPerKg * goalKg;
    const dailyDelta = Math.round(tdee * 0.2);
    const days = Math.round(totalKcal / dailyDelta);
    const weeks = (days / 7).toFixed(1);
    const months = (days / 30).toFixed(1);
    const goalText = goalType === 'lose' ? 'похудения' : 'набора';
    const calText = goalType === 'lose' ? 'Дефицит' : 'Профицит';
    const tip = goalType === 'lose' ? TIPS.deficit.lose : TIPS.deficit.gain;
    showResult('deficit-res',
        `${calText}: ${dailyDelta} ккал/день\nОбщий объём: ${totalKcal} ккал\n` +
        `Примерный срок ${goalText} на ${goalKg} кг:\nпримерно ${days} дней\nпримерно ${weeks} недель\nпримерно ${months} месяцев`,
        tip
    );
}

// Переключение разделов
function switchSection(sectionId) {
    document.querySelectorAll('.container').forEach(cont => cont.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
    if (sectionId === 'gyms') renderGymsList();
    document.getElementById('calcSelect').value = sectionId;
}

// База залов
const DEFAULT_GYMS = [
    { id: "g1", city: "Саратов", name: "Alex Fitness", address: "ул. Московская, 122", link: "https://alexfitness.ru", info: "Тренажерный зал, групповые программы | 4.7 | 07:00-23:00" },
    { id: "g2", city: "Саратов", name: "World Class", address: "пр. Кирова, 11", link: "https://worldclass-saratov.ru", info: "Премиум фитнес, бассейн | 4.9 | 06:00-00:00" },
    { id: "g3", city: "Саратов", name: "Forte Club", address: "ул. Вольская, 29", link: "http://clubforte.ru", info: "Тренажерный зал, бассейн, спа | 4.7 | 07:00-23:00" },
    { id: "g4", city: "Саратов", name: "DDX Fitness", address: "пр. Столыпина, 43", link: "https://ddxfitness.ru", info: "Тренажерный зал, групповой фитнес | 4.6 | 06:00-00:00" },
    { id: "g5", city: "Энгельс", name: "World Class", address: "ул. Льва Кассиля, 45", link: "https://worldclass-saratov.ru", info: "Премиум фитнес, бассейн | 4.9 | 07:00-23:00" },
    { id: "g6", city: "Энгельс", name: "Импульс", address: "ул. Тельмана, 16", link: "https://импульсфитнес.рф", info: "Тренажерный зал, кроссфит | 4.9 | 07:00-24:00" },
    { id: "g7", city: "Энгельс", name: "Alex Fitness", address: "ул. Комсомольская, 47", link: "https://alexfitness.ru", info: "Кардиозона, сайкл | 4.5 | 08:00-22:00" },
    { id: "g8", city: "Балаково", name: "FitnessLife", address: "ул. 30 лет Победы, 39а", link: "https://fitness-life64.ru", info: "Тренажерный зал, спа-зона | 4.7 | 08:00-22:00" },
    { id: "g9", city: "Балаково", name: "Black Gym", address: "просп. Героев, 25/1", link: "", info: "Пауэрлифтинг, свободные веса | 4.9 | 08:00-22:00" },
    { id: "g10", city: "Балаково", name: "Спортмастер", address: "ул. Трнавская, 24", link: "", info: "Кроссфит, функциональный тренинг | 4.7 | 08:00-22:00" },
    { id: "g11", city: "Вольск", name: "Атлант", address: "ул. Октябрьская, 97", link: "", info: "Тренажерный зал, кардио | 4.4 | 08:00-22:00" },
    { id: "g12", city: "Вольск", name: "Ритм", address: "ул. Комсомольская, 112", link: "", info: "Шейпинг, аэробика | 4.0 | 10:00-21:00" },
    { id: "g13", city: "Вольск", name: "SPARTA", address: "ул. Хальзова, 7", link: "", info: "Тяжелая атлетика | 4.8 | 09:00-22:00" },
    { id: "g14", city: "Балашов", name: "MIXfit", address: "ул. Пугачевская, 336", link: "https://ok.ru/mixfit", info: "Функциональный тренинг, йога | 4.3 | 08:00-22:00" },
    { id: "g15", city: "Балашов", name: "Fantastika", address: "ул. Энтузиастов, 1", link: "", info: "Силовые рамы, кардио | 3.7 | 08:00-22:00" },
    { id: "g16", city: "Балашов", name: "Fit Best", address: "ул. 30 Лет Победы, 166", link: "", info: "Женский фитнес, пилатес | 5.0 | 09:00-21:00" },
    { id: "g17", city: "Пугачев", name: "Olimp", address: "ул. Горького, 134", link: "", info: "Тяжелая атлетика, единоборства | 4.3 | 08:00-21:00" },
    { id: "g18", city: "Пугачев", name: "Витязь", address: "Коммунистическая ул., 100", link: "", info: "Пауэрлифтинг | 4.9 | 08:00-19:30" },
    { id: "g19", city: "Пугачев", name: "Форма", address: "ул. Бубенца, 20/9А", link: "", info: "Кроссфит, сайкл | 4.1 | 09:00-21:00" },
    { id: "g20", city: "Ртищево", name: "Юность", address: "ул. Зои Космодемьянской, 16", link: "http://fok-unost.ru", info: "Бассейн, тренажерный зал | 4.6 | 08:00-21:00" },
    { id: "g21", city: "Ртищево", name: "Бытовик", address: "ул. Советская, 3", link: "", info: "Атлетизм, свободные веса | 4.0 | 10:00-21:00" },
    { id: "g22", city: "Ртищево", name: "ДЮСШ (зал ОФП)", address: "ул. Зои Космодемьянской, 19", link: "", info: "ОФП, гиревой спорт | 4.8 | 08:00-17:00" },
    { id: "g23", city: "Маркс", name: "Центр", address: "проспект Ленина, 90а", link: "https://vk.com/marks_centr_sport", info: "Групповой фитнес, тренажеры | 4.7 | 09:00-21:00" },
    { id: "g24", city: "Маркс", name: "Олимп", address: "ул. Ленина, 102", link: "", info: "Тренажеры, кардиозона | 4.5 | 08:00-22:00" },
    { id: "g25", city: "Маркс", name: "Атлант", address: "пр-т Ленина, 36", link: "", info: "Пауэрлифтинг, кроссфит | 4.6 | 09:00-21:00" },
    { id: "g26", city: "Петровск", name: "Газовик", address: "ул. Плеханова, 10", link: "", info: "Бассейн, универсальный зал | 4.7 | 08:00-22:00" },
    { id: "g27", city: "Петровск", name: "Богатырь", address: "ул. Московская, 22", link: "", info: "Бодибилдинг, силовые тренажеры | 4.2 | 16:00-21:00" },
    { id: "g28", city: "Петровск", name: "Спортивная школа", address: "ул. Гоголя, 21", link: "", info: "ОФП, легкая атлетика | 4.4 | 15:00-20:00" },
    { id: "g29", city: "Аткарск", name: "Дельфин", address: "ул. Чапаева, 54", link: "", info: "Бассейн, тренажерный зал | 4.5 | 08:00-21:00" },
    { id: "g30", city: "Аткарск", name: "Лидер", address: "ул. Советская, 66", link: "", info: "Фитнес, растяжка, пилатес | 4.6 | 12:00-21:00" },
    { id: "g31", city: "Аткарск", name: "Зал атлетической гимнастики", address: "ул. Ленина, 3", link: "", info: "Тяжелая атлетика, гири | 4.1 | 16:00-21:00" },
    { id: "g32", city: "Красноармейск", name: "Титан", address: "ул. 1 Мая, 62", link: "", info: "Пауэрлифтинг, силовые рамы | 4.5 | 09:00-22:00" },
    { id: "g33", city: "Красноармейск", name: "Газовик", address: "Микрорайон 5, д. 8", link: "", info: "ОФП, игровые виды | 4.6 | 08:00-21:00" },
    { id: "g34", city: "Красноармейск", name: "Стимул", address: "ул. Ленина, 12", link: "", info: "Пилатес, стретчинг, йога | 4.8 | 10:00-20:00" },
    { id: "g35", city: "Хвалынск", name: "Хвалынь", address: "ул. Курортная, 1", link: "https://khvalin.ru", info: "Термы, бассейн, тренажерный зал | 4.9 | 09:00-22:00" },
    { id: "g36", city: "Хвалынск", name: "ДЮСШ", address: "ул. Советская, 88", link: "", info: "Гиревой спорт, ОФП | 4.3 | 15:00-20:00" },
    { id: "g37", city: "Хвалынск", name: "Волга", address: "ул. Ленина, 40", link: "", info: "Шейпинг, аэробика | 4.4 | 09:00-21:00" },
    { id: "g38", city: "Новоузенск", name: "Олимп", address: "ул. 1-я Линия, 18", link: "", info: "Универсальный зал, мини-футбол | 4.6 | 08:00-21:00" },
    { id: "g39", city: "Новоузенск", name: "Атлант", address: "ул. Коммунистическая, 34", link: "", info: "Тяжелая атлетика, пауэрлифтинг | 4.2 | 16:00-21:00" },
    { id: "g40", city: "Новоузенск", name: "Спарта", address: "ул. Рабочая, 5", link: "", info: "ОФП, кроссфит | 4.4 | 14:00-21:00" },
    { id: "g41", city: "Калининск", name: "Калининец", address: "ул. Советская, 22", link: "", info: "Волейбол, баскетбол | 4.4 | 09:00-21:00" },
    { id: "g42", city: "Калининск", name: "Импульс", address: "ул. Ленина, 45", link: "", info: "Пауэрлифтинг, силовые тренажеры | 4.5 | 10:00-22:00" },
    { id: "g43", city: "Калининск", name: "Грация", address: "ул. Чиркина, 3", link: "", info: "Зумба, аэробика, пилатес | 4.7 | 09:00-20:00" },
    { id: "g44", city: "Ершов", name: "Дельфин", address: "ул. Мелиоративная, 1А", link: "", info: "Бассейн, тренажерный зал | 4.5 | 08:00-21:00" },
    { id: "g45", city: "Ершов", name: "Локомотив", address: "ул. Вокзальная, 12", link: "", info: "Силовые тренажеры, свободные веса | 4.2 | 15:00-21:00" },
    { id: "g46", city: "Ершов", name: "Энергия", address: "ул. Интернациональная, 5", link: "", info: "Степ-аэробика, кардио | 4.6 | 10:00-21:00" },
    { id: "g47", city: "Аркадак", name: "Спартак", address: "ул. Ленина, 33", link: "", info: "Тяжелая атлетика, гири | 4.3 | 16:00-21:00" },
    { id: "g48", city: "Аркадак", name: "МУ СШ", address: "ул. Степная, 2", link: "", info: "Беговые дорожки, кардиотренажеры | 4.1 | 15:00-20:00" },
    { id: "g49", city: "Аркадак", name: "Импульс", address: "ул. Калинина, 45", link: "", info: "Пилатес, растяжка | 4.6 | 11:00-20:00" },
    { id: "g50", city: "Красный Кут", name: "Победа", address: "ул. Вокзальная, 91", link: "", info: "Спортивные секции, тренажерный зал | 4.6 | 08:00-21:00" },
    { id: "g51", city: "Красный Кут", name: "Лидер", address: "ул. Комсомольская, 23", link: "", info: "Пауэрлифтинг, кардио | 4.4 | 14:00-22:00" },
    { id: "g52", city: "Красный Кут", name: "Фитнес-Микс", address: "ул. Маяковского, 4", link: "", info: "Функциональный тренинг, сайкл | 4.7 | 09:00-20:00" },
    { id: "g53", city: "Шиханы", name: "Атлант", address: "ул. Ленина, 12", link: "", info: "Настольный теннис, тренажеры | 4.5 | 09:00-21:00" },
    { id: "g54", city: "Шиханы", name: "Строитель", address: "ул. Рыбакова, 4", link: "", info: "Свободные веса, силовые рамы | 4.2 | 16:00-21:00" },
    { id: "g55", city: "Шиханы", name: "Ника", address: "ул. Молодежная, 1", link: "", info: "Шейпинг, пилатес, растяжка | 4.6 | 10:00-20:00" }
];

function initGymDatabase() {
    const saved = sessionStorage.getItem('gymDatabase');
    const current = JSON.stringify(DEFAULT_GYMS);
    if (!saved || saved !== current) {
        sessionStorage.setItem('gymDatabase', current);
    }
}
function getGyms() { return JSON.parse(sessionStorage.getItem('gymDatabase') || '[]'); }
function renderGymsList() {
    const container = document.getElementById('dynamicGymsContainer');
    if (!container) return;
    const gyms = getGyms();
    const citiesMap = new Map();
    gyms.forEach(gym => { if (!citiesMap.has(gym.city)) citiesMap.set(gym.city, []); citiesMap.get(gym.city).push(gym); });
    let html = '';
    for (const [city, gymsOfCity] of citiesMap) {
        html += `<div class="city-group"><div class="city-title">${escapeHtml(city)}</div><div class="gym-grid">`;
        gymsOfCity.forEach(gym => {
            const mapLink = `https://yandex.ru/maps/?text=${encodeURIComponent(gym.address + ', ' + city)}`;
            const siteButton = (gym.link && gym.link !== '#') ? `<a href="${escapeHtml(gym.link)}" target="_blank">Сайт</a>` : '';
            html += `<div class="gym-card">
                <div class="gym-name">${escapeHtml(gym.name)}</div>
                <div class="gym-address">${escapeHtml(gym.address)}</div>
                <div class="gym-info">${escapeHtml(gym.info)}</div>
                <div class="gym-links">${siteButton}<a href="${mapLink}" target="_blank">Карта</a></div>
            </div>`;
        });
        html += `</div></div>`;
    }
    container.innerHTML = html;
}
function escapeHtml(str) { return str ? str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m])) : ''; }

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initGymDatabase();

    const bfHipGroup = document.getElementById('bf-hip-group');
    function toggleBfHip() {
        if (bfHipGroup) {
            bfHipGroup.style.display = document.querySelector('input[name="gender"]:checked').value === 'female' ? 'block' : 'none';
        }
    }
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', toggleBfHip);
    });
    toggleBfHip();

    document.getElementById('btnBMI').addEventListener('click', calcBMI);
    document.getElementById('btnBMR').addEventListener('click', calcBMR);
    document.getElementById('btnTDEE').addEventListener('click', calcTDEE);
    document.getElementById('btnBodyFat').addEventListener('click', calcBodyFat);
    document.getElementById('btnIdeal').addEventListener('click', calcIdealWeight);
    document.getElementById('btnWHtR').addEventListener('click', calcWHtR);
    document.getElementById('btnWater').addEventListener('click', calcWater);
    document.getElementById('btnBurn').addEventListener('click', calcExerciseBurn);
    document.getElementById('btnHeart').addEventListener('click', calcHeart);
    document.getElementById('btnMaxRep').addEventListener('click', calc1PM);
    document.getElementById('btnRunning').addEventListener('click', calcRunningPace);
    document.getElementById('btnDeficit').addEventListener('click', calcDeficit);

    document.getElementById('calcSelect').addEventListener('change', (e) => switchSection(e.target.value));
    document.getElementById('gymNavBtn').addEventListener('click', () => switchSection('gyms'));

    switchSection('profile');
    document.addEventListener('keydown', function (e) {
        if (e.key == 'Enter') {
            const activeContainer = document.querySelector('.container.active');
            if (!activeContainer) return;

            const btn = activeContainer.querySelector('.btn-primary');
            if (btn) {
                e.preventDefault();
                btn.click();
            }
        }
    });

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const select = document.getElementById('calcSelect');
        const currentIndex = select.selectedIndex;
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            select.selectedIndex = currentIndex - 1;
        } else if (e.key === 'ArrowDown' && currentIndex < select.options.length - 1) {
            select.selectedIndex = currentIndex + 1;
        }
        switchSection(select.value);
    }
});
