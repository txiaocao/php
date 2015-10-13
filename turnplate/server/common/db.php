<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../config.php';

class db extends PDO {
	public function __construct() {
		$this->init();
	}

	public function init() {
		parent::__construct(config::$dsn, config::$dbuser, config::$dbpwd);
		$this->beginTransaction();
	}
}