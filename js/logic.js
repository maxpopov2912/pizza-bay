   const gameData = {
            1: {
                background: './img/1.png',
                reactions: {
                    correct: '✅ Фирменная вывеска Pizza Bay никогда не обманет глаз!',
                    wrong: {
                        'По запаху свежей пиццы, доносящемуся с входа': 'Запах заманчивый, но он витает на весь квартал — можно ошибиться.',
                        'По толпе людей у дверей': 'Толпа всегда где-то есть. Но правильный знак — фирменная вывеска Pizza Bay.'
                    }
                }
            },
            2: {
                background: './img/2.png',
                reactions: {
                    correct: '✅ Все варианты вкусные, но для первого раза рекомендуем классику — Маргариту!',
                    wrong: {
                        default: 'Пепперони и 4 сыра — тоже отличные выборы, но новичку лучше начать с простого и фирменного.'
                    }
                }
            },
            3: {
                background: './img/3.png',
                reactions: {
                    correct: '✅ Отлично! Самый надёжный вариант - воспользоваться приложением!',
                    wrong: {
                        'Попросить бабушку позвонить': 'Бабушка может подвести с заказом, лучше справиться самому через приложение!',
                        'Громко крикнуть "Принесите сюда пиццу!"': 'Хорошо подумав, вы вспомнили, что у вас есть мобильное приложение.'
                    }
                }
            },
            4: {
                background: './img/4.png',
                reactions: {
                    correct: '✅ Супер! В вашем личном кабинете будет точно отображаться адрес!',
                    wrong: {
                        'Уточнить адрес по телефону': 'По телефону адрес можно перепутать. Лучше указать в приложении.',
                        'Написать адрес в комментариях вручную': 'Лучше указать свой адрес в личном кабинете, чтобы не было путаницы!'
                    }
                }
            }
        };

        let currentScene = 1;
        const gameElement = document.getElementById('game');
        
        // Устанавливаем начальный фон
        gameElement.style.backgroundImage = `url('${gameData[1].background}')`;

        function showReaction(sceneNum, answerType, buttonText = '') {
            const scene = document.querySelector(`[data-scene="${sceneNum}"]`);
            const reaction = scene.querySelector('.game__reaction');
            const reactionText = scene.querySelector('.reaction-text');
            const textbox = scene.querySelector('.game__textbox');
            
            let reactionMessage = '';
            
            if (answerType === 'correct') {
                reactionMessage = gameData[sceneNum].reactions.correct;
            } else {
                const wrongReactions = gameData[sceneNum].reactions.wrong;
                reactionMessage = wrongReactions[buttonText] || wrongReactions.default || 'Попробуй другой вариант!';
            }
            
            reactionText.textContent = reactionMessage;
            textbox.classList.add('hidden');
            reaction.classList.add('show');
        }

        function nextScene() {
            const currentSceneElement = document.querySelector(`[data-scene="${currentScene}"]`);
            currentSceneElement.classList.remove('active');
            
            currentScene++;
            
            if (currentScene > 4) {
                // Показываем финальный экран
                document.getElementById('final').classList.add('show');
                return;
            }
            
            const nextSceneElement = document.querySelector(`[data-scene="${currentScene}"]`);
            nextSceneElement.classList.add('active');
            
            // Меняем фон
            gameElement.style.backgroundImage = `url('${gameData[currentScene].background}')`;
            
            // Сбрасываем состояние новой сцены
            const textbox = nextSceneElement.querySelector('.game__textbox');
            const reaction = nextSceneElement.querySelector('.game__reaction');
            
            textbox.classList.remove('hidden');
            reaction.classList.remove('show');
        }

        // Обработчики событий
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('game__textbox-button')) {
                const answerType = e.target.dataset.answer;
                const buttonText = e.target.textContent.trim();
                const sceneNum = parseInt(e.target.closest('[data-scene]').dataset.scene);
                
                showReaction(sceneNum, answerType, buttonText);
            }
            
            if (e.target.classList.contains('game__button-next')) {
                nextScene();
            }
        });