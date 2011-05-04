<?php
if (list($table, $id, $name) = $adminer->_foreignColumn(column_foreign_keys($_GET["source"]), $_GET["field"])) {
	$result = $connection->query("SELECT $id, $name FROM " . table($table) . " WHERE $name LIKE " . q("$_GET[value]%") . " ORDER BY 2 LIMIT 11");
	for ($i=0; $i < 10 && ($row = $result->fetch_row()); $i++) {
		echo "<a href='" . h(ME . "edit=" . urlencode($table) . "&where" . urlencode("[" . bracket_escape(idf_unescape($id)) . "]") . "=" . urlencode($row[0])) . "'>" . h($row[1]) . "</a><br>\n";
	}
	if ($i == 10) {
		echo "...\n";
	}
}

exit; // don't print footer
