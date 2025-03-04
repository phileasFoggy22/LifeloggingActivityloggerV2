package com.bae.repository.test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.bae.persistence.domain.Activity;
import com.bae.persistence.domain.Hiking;
import com.bae.persistence.domain.User;
import com.bae.persistence.repository.ActivityDBRepository;
import com.bae.util.JSONUtil;

@RunWith(MockitoJUnitRunner.class)
public class ActivityDBRepositoryTest {

	private static final int MOCK_VALUE4 = 0;
	private static final String MOCK_VALUE3 = "[test_value_3]";
	private static final String MOCK_VALUE2 = "{\"test_value_2\":\"test\"}";
	private static final List<Activity> MOCK_VALUE5 = new ArrayList<Activity>();
	private static final String MOCK_VALUE = "test_value";
	private static final Activity newHike = new Hiking("File/Area", "long hike, feet hurt", "field",
			LocalDate.of(2019, 1, 1), LocalDate.of(2019, 1, 1), 10, "Hilly Hike");

	@InjectMocks
	private ActivityDBRepository actRepo;

	@Mock
	private EntityManager manager;

	private JSONUtil util;

	@Before
	public void setup() {
		actRepo.setManager(manager);
		util = new JSONUtil();
		actRepo.setUtil(util);
	}

	// @Test
	public void testFetchAllActivities() {

		User user = new User("N.Cravensworth@gmail.com", "Nadja Cravensworth", "Password");
		user.getActivityList().add(newHike);
		Mockito.when(manager.find(Mockito.any(), Mockito.anyString())).thenReturn(user);
		Assert.assertEquals(
				"[{\"location\":\"field\",\"startDate\":\"Jun 4, 2019 12:00:00 AM\",\"endDate\":\"Jun 4, 2019 12:00:00 AM\",\"lengthMiles\":10,\"officialRouteName\":\"Hilly Hike\",\"lifelogDirectory\":\"File/Area\",\"description\":\"long hike, feet hurt\"}]",
				actRepo.getAllActivities(MOCK_VALUE));

	}

	@Test
	public void testFetchAllActivitiesByCategory() {
		User user = new User("N.Cravensworth@gmail.com", "Nadja Cravensworth", "Password");
		Mockito.when(manager.find(Mockito.any(), Mockito.anyString())).thenReturn(user);
		Assert.assertEquals("{\"message\": \"You have not completed any activities\"}",
				actRepo.getAllActivitiesByCategory(MOCK_VALUE, MOCK_VALUE));

	}

	@Test
	public void testFetchAnActivity() {
		User user = new User("N.Cravensworth@gmail.com", "Nadja Cravensworth", "Password");
		Mockito.when(manager.find(Mockito.any(), Mockito.anyString())).thenReturn(user);
		String reply = actRepo.getAnActivity(MOCK_VALUE, MOCK_VALUE4);
		Assert.assertEquals("{\"message\": \"Activity not found\"}", reply);

	}

	// @Test
	// public void testCreateActivity() {
	// // User user = new User("N.Cravensworth@gmail.com", "Nadja Cravensworth",
	// // "Password");
	// // user.getActivityList().add(newHike);
	// // System.out.println(user.getActivityList());
	// // Mockito.when(manager.find(Mockito.any(),
	// // Mockito.anyString())).thenReturn(user);
	// // Assert.assertEquals(actRepo.createActivity(MOCK_VALUE,
	// // util.getJSONForObject(newHike)),
	// // "{\"location\":\"field\",\"startDate\":\"Nov 15, 2017\",\"endDate\":\"Nov
	// 16,
	// // 2017\",\"lengthMiles\":10,\"officialRouteName\":\"Hilly
	// // Hike\",\"lifelogDirectory\":\"File/Area\",\"description\":\"long hike,
	// feet
	// // hurt\"}");
	//
	// User user = new User("N.Cravensworth@gmail.com", "Nadja Cravensworth",
	// "Password");
	// user.getActivityList().add(newHike);
	// Mockito.when(manager.find(Mockito.any(),
	// Mockito.anyString())).thenReturn(user);
	// String reply = actRepo.createActivity(MOCK_VALUE, MOCK_VALUE2);
	// Assert.assertEquals(reply, "{\"message\": \"activity successfully added\"}");
	// }

	@Test
	public void testRemoveActivity() {
		User user = new User("N.Cravensworth@gmail.com", "Nadja Cravensworth", "Password");
		Mockito.when(manager.find(Mockito.any(), Mockito.anyString())).thenReturn(user);
		String reply = actRepo.deleteActivity(MOCK_VALUE, MOCK_VALUE4);
		Assert.assertEquals("{\"message\": \"activity successfully removed\"}", reply);
	}

	@Test
	public void testUpdateActivity() {
		User user = new User("N.Cravensworth@gmail.com", "Nadja Cravensworth", "Password");
		Mockito.when(manager.find(Mockito.any(), Mockito.anyString())).thenReturn(user);
		String reply = actRepo.updateActivity(MOCK_VALUE, MOCK_VALUE, MOCK_VALUE4);
		Assert.assertEquals("{\"message\": \"Activity successfully updated\"}", reply);
	}
}