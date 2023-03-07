<?php

class Good extends \AbstractClasses\Unit
{
    
    const TABLE = 'goods';

    protected function getField(string $field) : mixed
    {        
        return $this->getLine()[$field];
    }

    protected function updateField(string $field) : bool
    {        

        return $this::updateLine()[$field];
    }

}

