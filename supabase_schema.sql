-- Create the quiz results table
CREATE TABLE IF NOT EXISTS public.quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    overall_score INT NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    risk_level VARCHAR(20) NOT NULL CHECK (risk_level IN ('Low', 'Moderate', 'High')),
    category_scores JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_results
-- Allow users to select their own results
CREATE POLICY "Allow users to read own results" ON public.quiz_results
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to insert their own results
CREATE POLICY "Allow users to insert own results" ON public.quiz_results
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own results (GDPR compliant)
CREATE POLICY "Allow users to delete own results" ON public.quiz_results
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create the cycle logs table
CREATE TABLE IF NOT EXISTS public.cycle_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    cycle_length INT NOT NULL DEFAULT 28 CHECK (cycle_length > 10 AND cycle_length < 100),
    period_days INT NOT NULL DEFAULT 5 CHECK (period_days > 1 AND period_days < 20),
    symptoms JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for cycle_logs
ALTER TABLE public.cycle_logs ENABLE ROW LEVEL SECURITY;

-- Allow users to read own cycle logs
CREATE POLICY "Allow users to read own cycle logs" ON public.cycle_logs
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to insert own cycle logs
CREATE POLICY "Allow users to insert own cycle logs" ON public.cycle_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to delete own cycle logs
CREATE POLICY "Allow users to delete own cycle logs" ON public.cycle_logs
    FOR DELETE
    USING (auth.uid() = user_id);

