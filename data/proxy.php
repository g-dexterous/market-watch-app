<?php
	$ch = curl_init();

	$url = 'http://marketplace.envato.com/api/v1/popular:'.$_GET["sitename"].'.json';

	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$ch_data = curl_exec($ch);
	curl_close($ch);

	if(!empty($ch_data))
	{
		echo $ch_data;

		/*
		$json_data = json_decode($ch_data, true);
		//print_r($json_data);
		$json_short = $json_data['popular']['items_last_week'];//Save us some typing.
		$data_count = count($json_short) -1;
		
		echo '<ul>';
		for($i = 0; $i <= $data_count; $i++)
		{
			echo '<li><img style="width: 560px;" src="',$json_short[$i]['thumbnail'],'" alt=""><a href="',$json_short[$i]['url'],'">',$json_short[$i]['item'],'</a></li>';
		}
		echo '</ul>';*/
	}
	else 
	{
		echo 'Sorry, but there was a problem connecting to the API.';
	}
?>