import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';
import NoResult from '../assets/images/download.jpg';
import { baseUrl, fetchApi } from '../utils/fetchApi';

const search = ({ properties }) => {
	const [searchFilter, setSearchFilter] = useState(false);
	const router = useRouter();

	return (
		<>
			<Box>
				<Flex
					cursor='pointer'
					bg='gray.100'
					borderBottom='1px'
					borderColor='gray.200'
					p='2'
					fontWeight='black'
					fontSize='lg'
					justifyContent='center'
					alignItems='center'
					onClick={() => setSearchFilter(!searchFilter)}
				>
					<Text>Search Property By Filters</Text>
					<Icon paddingLeft='2' w='7' as={BsFilter} />
				</Flex>
				{searchFilter && <SearchFilters />}
				<Text fontSize='2xl' p='4' fontWeight='bold'>
					Properties {router.query.purpose}
				</Text>
				<Flex flexWrap='wrap'>
					{properties.map((property) => (
						<Property property={property} key={property.id} />
					))}
				</Flex>
				{properties.length === 0 && (
					<Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
						<Image alt='no result' src={NoResult} />
						<Text fontSize='2xl' marginTop='3'>
							No Results Found
						</Text>
					</Flex>
				)}
			</Box>
		</>
	);
};

export async function getServerSideProps({ query }) {
	const purpose = query.purpose || 'for-rent';
	const rentFrequency = query.rentFrequency || 'yearly';
	const priceMin = query.priceMin || '0';
	const priceMax = query.priceMax || '1000000';
	const areaMax = query.areaMax || '3500';
	const roomsMin = query.roomsMin || '0';
	const bathsMin = query.bathsMin || '0';
	const sort = query?.sort || 'price-desc';
	const locationExternalIDs = query.locationExternalIDs || '5002';
	const categoryExternalID = query.categoryExternalID || '4';

	const data = await fetchApi(
		`${baseUrl}/properties/list?categoryExternalID=${categoryExternalID}&sort=${sort}&bathsMin=${bathsMin}&roomsMin=${roomsMin}&areaMax=${areaMax}&priceMax=${priceMax}&priceMin=${priceMin}&rentFrequency=${rentFrequency}&locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&hitsPerPage=50`
	);

	return {
		props: {
			properties: data?.hits,
		},
	};
}

export default search;
