import express from 'express'
import cors from 'cors'
import OpenAI from 'openai';

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: "sk-6d2225f0ef2749b59f2fe14700944051",
    baseURL: "https://api.deepseek.com",
});
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        //天气查询
        if (message.includes('天气')) {
            const city = message
                .replace(/今天|明天|后天|天气|怎么样|如何|？|\?/g, '')
                .trim() || 'Beijing';
            const weatherRes = await fetch(
                `https://wttr.in/${encodeURIComponent(city)}?format=3`
            );

            const weatherData = await weatherRes.text();
            const formatWeather = weatherData
                .replace('🌤️', '多云')
                .replace('☀️', '晴天')
                .replace('🌦️', '阵雨')
                .replace('🌧️', '下雨')
                .replace('⛅️', '阴天')
                .replace('+', '');
            const arr = formatWeather.split(':');

            return res.send({
                reply: `城市:${arr[0].trim()}
                当前天气:${arr[1].trim()}`,
            });
        }

        // 普通对话
        const stream = await client.chat.completions.create({
            model: 'deepseek-v4-flash',
            messages: [
                {
                    role: 'assistant',
                    content:
                        '当用户输入的是表达式，则输出：表达式 = 结果，禁止输出任何英文解释或多余文字。如果用户输入的是其他问题，则正常回答。',
                },
                {
                    role: 'user',
                    content: message,
                },
            ],
            stream: true,
        });

        res.setHeader(
            'Content-Type',
            'text/plain; charset=utf-8'
        );

        for await (const chunk of stream) {
            const content =
                chunk.choices[0]?.delta?.content || '';

            res.write(content);
        }

        res.end();
    } catch (error) {
        console.log(error);

        if (!res.headersSent) {
            res.status(500).send({
                reply: '请求失败',
            });
        }
    }
});


app.listen(3001, () => {
    console.log("server running 3001");
});