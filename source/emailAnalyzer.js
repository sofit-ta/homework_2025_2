'use strict';
/**
 * Функция, анализирующая строку на наличие наличие email-адресов.
 * @param {string} text - строка для анализа.
 *
 * @example
 * // returns { emailCount: 2, uniqueEmails: ['email@email.ru','example@example.com'], mostFrequentEmail: 'example@example.com' }
 * emailAnalyzer('Моя почта: 1. рабочая example@example.com 2. личная email@email.ru');
 * 
 * @returns {Object} result - результаты анализа
 * @returns {number} result.emailCount - количество электронных адресов в строке
 * @returns {string[]} result.uniqueEmails - массив уникальных электронных адресов, найденных в строке
 * @returns {string} result.mostFrequentEmail - электронный адрес, который встречается чаще всего
 */
const emailAnalyzer = (text) => {
    if (typeof text !== 'string' && !(text instanceof String)) {
        return { emailCount: 0, uniqueEmails: [], mostFrequentEmail: "" };
    }

    // проверка на соотвествие шаблону: 
    // непустая последовательность символов + @ + непустой домен, состоящий из букв/цифр или точек (не в конце/в начале/ повторяющихся подряд)
    let emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+/gi);

    if (!emails) {
        return { emailCount: 0, uniqueEmails: [], mostFrequentEmail: "" };
    }
    emails = emails.map(email => email.toLowerCase());
    const emailCount = emails.length;

    const emailsEntryAmount = new Map();
    for (const email of emails) {
        emailsEntryAmount.set(email, 1 + (emailsEntryAmount.get(email) || 0));
    }
    
    const uniqueEmails = [];
    let mostFrequentEmail;
    let maxCount = 0;
    emailsEntryAmount.forEach((amount, email) => {
        uniqueEmails.push(email);
        if (amount > maxCount) {
            maxCount = amount;
            mostFrequentEmail = email;
        }
    });
    uniqueEmails.sort();

    return { emailCount, uniqueEmails, mostFrequentEmail};
};