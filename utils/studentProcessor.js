import fs from 'fs'
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, '../student.json');
function assignStatus(score) {
  if (score >= 80) return 'Passed';
  if (score >= 70) return 'Needs Improvement';
  return null;
}
export async function handleStudentProcessing() {
  const rawData = await readFile(jsonPath, 'utf-8');
  const originalList = JSON.parse(rawData);
  const processedList = originalList
    .filter(student => student.score >= 70)
    .map(student => ({
      ...student,
      status: assignStatus(student.score),
    }));
  await writeFile(jsonPath, JSON.stringify(processedList, null, 2));
  const summary = {
    total: processedList.length,
    passed: processedList.filter(s => s.status === 'Passed').length,
    needsImprovement: processedList.filter(s => s.status === 'Needs Improvement').length,
  };

  return {
    students: processedList,
    studentSummary: summary,
  };
}


