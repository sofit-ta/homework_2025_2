'use strict';

QUnit.module("Тестируем функцию emailAnalyzer", function() {
    QUnit.test("Работает правильно со строкой с одним email", function(assert) {
        const input = "Мой email: user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с разными регистрами email", function(assert) {
        const input = "Контакты: User@Example.com и user@example.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });

    QUnit.test("Работает правильно со строкой с некорректными email", function(assert) {
        const input = "Некорректные email: user@, @example.com, user@domain..com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });
    // Дополнительные тесты

    QUnit.test("Дополнительный тест 1. Работает правильно со строкой с некорректными и корректными email", function(assert) {
        const input = "Корректные email: email@mail.ru, a@a.com. Некорректные email: @email, user@.com, email@.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result.emailCount, 2);
        assert.deepEqual(result.uniqueEmails, ["a@a.com","email@mail.ru"]);
        assert.true(
            ["a@a.com","email@mail.ru"].includes(result.mostFrequentEmail)
        );
    });

    QUnit.test("Дополнительный тест 2. Правильно находит самый часто повторяющийся email", function(assert) {
        const input = "Вам поступали письма от: user@example.com, user@example.com, user@domain.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 3,
            uniqueEmails: ["user@domain.com", "user@example.com"],
            mostFrequentEmail: "user@example.com"
        });
    });
    // Добавлен тест на нестроковый тип данных на входе
    QUnit.test("Дополнительный тест 3. Работает правильно с нестроковым значениями на входе", function(assert) {
        const input = [true, 3, "user@example.com"];
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 0,
            uniqueEmails: [],
            mostFrequentEmail: ""
        });
    });
    // Добавлен тест на алфавитный порядок вывода уникальных почт
    QUnit.test("Дополнительный тест 4. Правильно выводит неповторяющиеся почты в алфавитном порядке", function(assert) {
        const input = "Вам поступали письма от: b@example.com, c@example.com, s@domain.com, s@momain.com, aa@mail.ru.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result.emailCount, 5);
        assert.deepEqual(result.uniqueEmails,['aa@mail.ru','b@example.com','c@example.com','s@domain.com','s@momain.com']);
        assert.true(
            ['aa@mail.ru','b@example.com','c@example.com','s@domain.com','s@momain.com'].includes(result.mostFrequentEmail)
        );
    });
    // Добавлен тест на проверку объекта String
    QUnit.test("Дополнительный тест 5. Правильно обрабатывает объект String", function(assert) {
        const input = new String("Ваша почта: aa@mail.ru.");
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 1,
            uniqueEmails: ['aa@mail.ru'],
            mostFrequentEmail: "aa@mail.ru"
        });
    });
});


