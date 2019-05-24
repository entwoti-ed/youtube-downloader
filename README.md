# youtube_downloader
Uses https://ddownr.com to bypass school filter and download Youtube videos

Essentially this hijackes the ddownr internal API to send a Youtube link and recieve a direct downlaod link to the file.
Audio and video formats are supported, with video formats ranging from 360p to 720p.

After obtaining the direct link, the script passes it into a third party Google app script which fetches the file and saves it to Google drive.
