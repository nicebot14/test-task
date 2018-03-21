<?php

const DB_USER = 'world';
const DB_PASS = 'world';
const DB_NAME = 'world';
const DB_HOST = 'mysql';

$dbh = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS);
$dbh->exec('SET sql_mode = \'\';');

$sort = $_GET['sort'] ?? 'Continent';
$direction = $_GET['direction'] ?? 'ASC';

$allowedSortFields = ['Continent', 'Region', 'Countries', 'LifeDuration', 'Population', 'Cities', 'Languages'];
$allowedDirectionFields = ['ASC', 'DESC'];

function forbidden() {
    http_response_code(403);
    die('Hacker attack!');
}

if (!in_array($sort, $allowedSortFields)) {
    forbidden();
}

if (!in_array($direction, $allowedDirectionFields)) {
    forbidden();
}

$query = <<<EOF
SELECT * 
FROM (
	SELECT t1.*, t2.Cities, t3.Languages
	FROM (
		SELECT 
			c.Continent, 
			c.Region, 
			COUNT(c.Code) as Countries, 
			FORMAT(AVG(c.LifeExpectancy), 2) as LifeDuration,
			NULLIF(SUM(c.Population), 0) as Population
		FROM Country c
		GROUP BY c.Region
	) t1
	INNER JOIN (
		SELECT co.Region, NULLIF(COUNT(ci.ID), 0) as Cities
		FROM Country co
		LEFT JOIN City ci ON ci.CountryCode = co.Code 
		GROUP BY co.Region
	) t2 ON t1.Region = t2.Region
	INNER JOIN (
		SELECT co.Region, NULLIF(COUNT(cl.`Language`), 0) as Languages
		FROM Country co
		LEFT JOIN CountryLanguage cl ON cl.CountryCode = co.Code 
		GROUP BY co.Region
	) t3 ON t1.Region = t3.Region
) r
ORDER BY r.$sort $direction
EOF;

$sth = $dbh->prepare($query);
$sth->execute();

$result = json_encode($sth->fetchAll(PDO::FETCH_ASSOC));

$sth = null;
$dbh = null;

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

echo $result;
