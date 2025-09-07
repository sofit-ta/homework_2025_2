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

        assert.deepEqual(result, {
            emailCount: 2,
            uniqueEmails: ["email@mail.ru", "a@a.com"],
            mostFrequentEmail: "email@mail.ru" || "a@a.com"
        });
    });

    QUnit.test("Дополнительный тест 2. Правильно находит самый часто повторяющийся email", function(assert) {
        const input = "Вам поступали письма от: user@example.com, user@example.com, user@domain.com.";
        const result = emailAnalyzer(input);

        assert.deepEqual(result, {
            emailCount: 3,
            uniqueEmails: ["user@example.com", "user@domain.com"],
            mostFrequentEmail: "user@example.com"
        });
    });
});


