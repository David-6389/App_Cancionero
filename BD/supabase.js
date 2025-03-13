// base de datos --> supabase

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dqnrueyhwjbaxkgfcomq.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbnJ1ZXlod2piYXhrZ2Zjb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3Nzg4NTcsImV4cCI6MjA1NzM1NDg1N30.DW718bSvlFjGor86QxZUQ27wn444xq6yZTya_6YpJrA'; // Reemplaza con tu clave pública
export const supabase = createClient(supabaseUrl, supabaseKey);
