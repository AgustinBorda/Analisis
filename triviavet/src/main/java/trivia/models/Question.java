package trivia.models;

import trivia.structures.Pair;

import java.util.List;
import java.util.Random;

import org.javalite.activejdbc.Model;
import org.javalite.activejdbc.validation.UniquenessValidator;
import org.json.JSONObject;

import trivia.structures.QuestionParam;

public class Question extends Model {

	static {
		validatePresenceOf("description").message("Please, provide description");
		validateWith(new UniquenessValidator("description")).message("This description is already used.");
	}

	public void setQuestion(QuestionParam bodyParams) {
		this.set("description", bodyParams.description);
		this.set("category", bodyParams.category);
		Option.setOptions(bodyParams.options, this);
		this.saveIt();
	}

	public static Pair<JSONObject, String> getQuestion(String userId) {
		Random r = new Random();
		JSONObject resp = new JSONObject();
		List<Question> questions;
		questions = Question.findBySQL("SELECT * FROM questions WHERE id " + "NOT IN (SELECT id FROM questions "
				+ "INNER JOIN ((SELECT * FROM user_questions WHERE user_id = ?) as contestadas) "
				+ "ON questions.id = contestadas.question_id)", userId);

		Question question = questions.get(r.nextInt(questions.size()));
		List<Option> options = Option.where("question_id = ?", question.get("id"));
		resp.put("description", question.get("description"));

		int i = 1;
		for (Option o : options) {
			resp.put("answer" + i, o.get("description"));
			i++;
		}
		Pair<JSONObject, String> answer = new Pair<JSONObject, String>(resp, question.get("id").toString());
		return answer;
	}

	public static Pair<JSONObject, String> getQuestion(String category, String userId) {
		if (category == null) {
			return getQuestion(userId);
		}
		Random r = new Random();
		JSONObject resp = new JSONObject();
		List<Question> questions;
		questions = Question.findBySQL("SELECT * FROM questions WHERE id " + "NOT IN (SELECT id FROM questions "
				+ "INNER JOIN ((SELECT * FROM user_questions WHERE user_id = ?) as contestadas) "
				+ "ON questions.id = contestadas.question_id) AND category = ?", userId, category);

		Question question = questions.get(r.nextInt(questions.size()));
		List<Option> options = Option.where("question_id = ?", question.get("id"));
		resp.put("description", question.get("description"));

		int i = 1;
		for (Option o : options) {
			resp.put("answer" + i, o.get("description"));
			i++;
		}
		Pair<JSONObject, String> answer = new Pair<JSONObject, String>(resp, question.get("id").toString());
		return answer;
	}

	public JSONObject answerQuestion(String answer, String username) {
		JSONObject resp = new JSONObject();
		List<Option> options = Option.where("question_id = ?", this.get("id"));
		int i = Integer.parseInt(answer);
		Option option = options.get(i - 1);
		UserStatisticsCategory stat = UserStatisticsCategory.findFirst("user = ? AND nombre = ?", username,
				this.get("category"));
		if ((boolean) option.get("correct")) {
			UserQuestions.createUserQuestion(username, this.get("id").toString());
			stat.updateCorrectAnswer();
			resp.put("answer", "Correcto!");
		} else {
			stat.updateIncorrecrAnswer();
			resp.put("answer", "Incorrecto!");
		}
		return resp;
	}

	public static Question getQuestionById(String id) {
		return Question.findFirst("id = ?", id);
	}
}
