<?php

$filename   = $argv[1];
$handle     = fopen($filename, 'r');
$lines      = explode("\n", fread($handle, filesize($filename)));

fclose($handle);

$gates = array();

// Create all of the gates first

foreach ($lines as $line) {
    $parts = explode(' -> ', $line, strlen($line));
    $gates[$parts[1]] = array( 'value' => -1, 'instructions' => $parts[0], 'gate' => $parts[1], 'set' => false);
}

//echo(var_dump($gates));


$complete = false;
$loop_counter = 0;
while ($complete == false) {
    $loop_counter++;
    echo("\n\n=====================\nloop: $loop_counter\n\n");
    $complete = true;

    $set = 0;
    foreach ($lines as $line) {
        

        $parts = explode(' -> ', $line, strlen($line));
        //echo($parts[1] . "\n");
        //echo(var_dump($gates[$parts[1]]) . "\n");

        //if ($parts[1] == 'a') {
        //    echo(var_dump($parts) . "\n");
        //}

        if ($gates[$parts[1]]['set'] == true) {
            //echo("Already has a value!\n\n");
            //echo(var_export($gates[$parts[1]]) . "\n");
            $set++;
            continue;
        } else {
            //echo("\n\n========\nline: $line\n");
            //echo("No value yet!\n");
            //echo '/' . $parts[0] . '/' . '/' . $parts[1] . '/' . "\n";
            
            if (is_numeric($parts[0])) {
                // It's a straight assignment.
                echo("straight assignment: $line\n");
                //echo("check {$parts[1]}: {$gates[$parts[1]]['value']}\n");

                $gates[$parts[1]]['value'] = (int)$parts[0];
                $gates[$parts[1]]['set'] = true;
                $set++;

            } else if (str_contains($parts[0], 'AND')) {
                
                $instructions = explode(' ', $parts[0], strlen($parts[0]));

                $left = '';

                if (is_numeric($instructions[0])) {
                    $left = (int)$instructions[0];
                } else {
                    $left = $gates[$instructions[0]]['value'];
                }

                if (!$left || !$gates[$instructions[2]]['set']) {
                    $complete = false;
                    //echo("The gate {$left} or {$instructions[2]} has no value yet");
                    continue;
                }                
        
                echo("AND: $line\n"); 

                $gates[$parts[1]]['value'] = $left & $gates[$instructions[2]]['value'];
                $gates[$parts[1]]['set'] = true;
                $set++;

            } else if (str_contains($parts[0], 'OR')) {
                
                $instructions = explode(' ', $parts[0], strlen($parts[0]));

                if (!$gates[$instructions[0]]['set'] || !$gates[$instructions[2]]['set']) {
                    $complete = false;
                    //echo("The gate {$instructions[0]} has no value yet");
                    continue;
                }

                echo("OR. $line\n");

                $gates[$parts[1]]['value'] = $gates[$instructions[0]]['value'] | $gates[$instructions[2]]['value'];
                $gates[$parts[1]]['set'] = true;
                $set++;

            } else if (str_contains($parts[0], 'LSHIFT')) {
                
                $instructions = explode(' ', $parts[0], strlen($parts[0]));

                if (!$gates[$instructions[0]]['set']) {
                    $complete = false;
                    //echo("The gate {$instructions[0]} has no value yet");
                    continue;
                }
                
                echo("LSHIFT. $line\n");

                $gates[$parts[1]]['value'] = $gates[$instructions[0]]['value'] << (int)$instructions[2];
                $gates[$parts[1]]['set'] = true;
                $set++;

            } else if (str_contains($parts[0], 'RSHIFT')) {
                
                $instructions = explode(' ', $parts[0], strlen($parts[0]));

                if (!$gates[$instructions[0]]['set']) {
                    $complete = false;
                    //echo("The gate {$instructions[0]} has no value yet");
                    continue;
                }

                echo("RSHIFT. $line\n");

                $gates[$parts[1]]['value'] = $gates[$instructions[0]]['value'] >> (int)$instructions[2];
                $gates[$parts[1]]['set'] = true;
                $set++;

            } else if (str_contains($parts[0], 'NOT')) {
                
                $instructions = explode(' ', $parts[0], strlen($parts[0]));

                if (!$gates[$instructions[1]]['set']) {
                    $complete = false;
                    //echo("The gate {$instructions[1]} has no value yet");
                    continue;
                }

                echo("NOT. $line\n");

                $gates[$parts[1]]['value'] = ((~$gates[$instructions[1]]['value']) & 0xFFFF);
                $gates[$parts[1]]['set'] = true;
                $set++;


            }  else { //else if (!is_numeric($parts[0]) && strlen($parts[0]) == 2) {
                
                //echo(var_export($gates[$parts[0]]));
                //echo(var_export($gates[$parts[1]]));

                //echo("check {$parts[0]}: {$gates[$parts[0]]['value']}\n");

                //$instructions = explode(' ', $parts[0], strlen($parts[0]));

                if (!$gates[$parts[0]]['set']) {
                    $complete = false;
                    //echo("The gate {$parts[0]} has no value yet");
                    continue;
                }

                echo("It's a straight assignment, but with another gate. $line\n");

                $gates[$parts[1]]['value'] = $gates[$parts[0]]['value'];
                $gates[$parts[1]]['set'] = true;
                $set++;
            }
            
            echo("after {$parts[1]}: ". var_export($gates[$parts[1]]) . "\n");

        }
        echo("\n");
    }
    echo("\n\nSet in last loop: $set" . "\n");
    echo"========================\n\n";
    

    //if ($gates['a']['set']) {
    //    break;
    //}

    //if ($loop_counter > 400) {
    //    break;
    //}

}

//echo var_export($gates);

echo("loops: " . $loop_counter . "\n");
//echo(var_export($gates['a']));
echo(count($gates));
