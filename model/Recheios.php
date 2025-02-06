<?php

    class Recheios{
        protected $id;
        protected $Nome;

        public function __construct($Nome){
            $this->Nome = $Nome;
          
        }

        public function get_id(){
            return $this->id; 
        }

        public function set_id($id){
            $this->id = $id;
        }

        public function get_Nome(){
            return $this->Nome;
        }

    }

?>