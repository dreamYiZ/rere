// app/api/log/route.js

import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const { timeArray, timeScaleRate } = await req.json();
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}-${String(now.getMilliseconds()).padStart(3, '0')}`;
  const logDirectory = path.join(process.cwd(), 'log');

  // Ensure log directory exists
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  const logFilePath = path.join(logDirectory, `${timestamp}.log`);
  const logContent = `timeArray: ${JSON.stringify(timeArray, null, 2)}\ntimeScaleRate: ${timeScaleRate}\n`;

  fs.writeFileSync(logFilePath, logContent, 'utf8');
  
  return new Response(JSON.stringify({ message: 'Log created successfully' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
