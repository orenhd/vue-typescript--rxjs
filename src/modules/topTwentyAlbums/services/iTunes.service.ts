import { Observable } from 'rxjs/Observable';

import { ITunesAlbumEntry, ITunesGenre } from '../topTwentyAlbums.DataModels';

const ITUNES_GET_TOP_ALBUMS_API: string = 'https://itunes.apple.com/us/rss/topalbums';

const getITunesTopAlbumsByGenreIdUrl = (genreId: number) => 
    `${ITUNES_GET_TOP_ALBUMS_API}/limit=20/genre=${genreId}/json`;

// iTunes rss api doesn't really have a genre ids endpoint 
// - the following cache object is used as a mockup
const iTunesGenreIdsCache: ITunesGenre[] = [
	{ title: 'Pop', id: 14 },
	{ title: 'Rock', id: 21 },
	{ title: 'Alternative', id: 20 },
	{ title: 'Dance', id: 17 },
	{ title: 'Electronic', id: 7 }
];

const iTunesTopTwentyAlbumsByGenreIdCache: {[genreId: number]: ITunesAlbumEntry[]} = {};

export function getGenres(): Observable<ITunesGenre[]> {
	return new Observable<ITunesGenre[]>((observer) => {
		setTimeout(() => {
			observer.next(iTunesGenreIdsCache);
		}, Math.floor(Math.random() * 100));
	});
}

export function getTopTwentyAlbumsByGenreId(genreId: number):Observable<ITunesAlbumEntry[]> {
	return new Observable<ITunesAlbumEntry[]>((observer) => {
		if (isNaN(genreId) || genreId < 0) { observer.error('getTopTwentyAlbumsByGenreId error'); }

		//first, try from cache
		else if (iTunesTopTwentyAlbumsByGenreIdCache[genreId]) { observer.next(iTunesTopTwentyAlbumsByGenreIdCache[genreId]); }

		else {
			const iTunesGetTopAlbumsApi:string = getITunesTopAlbumsByGenreIdUrl(genreId);
			fetch(iTunesGetTopAlbumsApi, {
				method: 'get'
			}).then((response) => {
				const contentType = response.headers.get("content-type");
				if(contentType && contentType.includes('text/javascript')) {
					response.json().then((json) => {
						if (json.feed && json.feed.entry) {
							//also store in private service cache
							iTunesTopTwentyAlbumsByGenreIdCache[genreId] = json.feed.entry;
							observer.next(json.feed.entry);
						} else {
							observer.error('getTopTwentyAlbumsByGenreId error');
						}
					}).catch((err) => {
						// error
						observer.error(err);
					});
				}
			}).catch((err) => {
				// error
				observer.error(err);
			});
		}
	});
}
