<?php
/*
 * Generate JSON data for projects.php
 * 
 * Development History:
 * 2011-07-30   #14907      Leo
 * 
 */
error_reporting(E_ALL);
include("config.php");
include("class.session_handler.php");
include("classes/Project.class.php");
// Create project object
$projectHandler = new Project();
// Get listing of active projects
$projectListing = $projectHandler->getProjects(true);
// Define values for sorting a display
$limit = 10;
$page = isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1;
$letter = isset($_REQUEST["letter"]) ? trim($_REQUEST["letter"]) : "all";
if($letter == "all"){
    $letter = ".*";
} else if ($letter == "_"){ //numbers
    $letter = "[^A-Za-z]";
}
// Count total number of active projects
$activeProjectsCount = count($projectListing);

//Sort items by Bidding count, then by Total Fees
function sortProjects($a, $b) { 
    if ( $b["bCount"] < $a["bCount"] ) return -1;
    if ( $b["bCount"] > $a["bCount"] ) return 1;
    if ( $b["cCount"] < $a["cCount"] ) return -1;
    if ( $b["cCount"] > $a["cCount"] ) return 1; 
    if ( $b["feesCount"] > $a["feesCount"] ) return -1;
    if ( $b["feesCount"] < $a["feesCount"] ) return 1;
     
    return 0; 
} 
 
usort($projectListing, "sortProjects");

// Create content for each page
// Select projects that match the letter chosen and construct the array for
// the selected page
$pageFinish = $page * $limit;
$pageStart = $pageFinish - ($limit - 1);
$selectedProjects = array();
if ($projectListing != null) {
    foreach ($projectListing as $key => $value) {
        if (preg_match("/^$letter/i", $value["name"])) {
            $selectedProjects[] = $value;
        }
    }
}
// Count number of projects to display
$projectsToDisplay = count($selectedProjects);
// Determine total number of pages
$displayPages = ceil($projectsToDisplay/$limit);
// Construct json for pagination
$projectsOnPage = array(array($projectsToDisplay, $page, $displayPages));
// Select projects for current page
$i = $pageStart - 1;
while ($i < $pageFinish) {
    if (isset($selectedProjects[$i])) {
        $projectsOnPage[] = $selectedProjects[$i];
    }
    $i++;
}

// Prepare data for printing in projects.php
$json = json_encode($projectsOnPage);
echo $json;
?>
