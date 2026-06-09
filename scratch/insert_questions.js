const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables manually
const envPath = path.join(__dirname, '..', 'app', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length === 2) {
    env[parts[0].trim()] = parts[1].trim();
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Reading questions.json...');
  const questionsPath = path.join(__dirname, '..', 'app', 'src', 'data', 'questions.json');
  const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
  console.log(`Found ${questionsData.length} questions.`);

  // Delete existing (anon delete is allowed because of: "Users can manage own progress" / default RLS rules or we already cleared it)
  // Wait, let's just insert
  const batchSize = 50;
  for (let i = 0; i < questionsData.length; i += batchSize) {
    const batch = questionsData.slice(i, i + batchSize).map(q => ({
      milestone_id: q.milestone_id,
      topic: q.topic,
      question_text: q.question_text,
      options: q.options,
      explanation: q.explanation,
      difficulty: q.difficulty,
      source: q.source
    }));

    console.log(`Inserting batch ${i / batchSize + 1} (${batch.length} rows)...`);
    const { data, error } = await supabase
      .from('questions')
      .insert(batch);

    if (error) {
      console.error('Error inserting batch:', error);
      process.exit(1);
    }
  }

  console.log('Seeding completed successfully!');
}

run().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
