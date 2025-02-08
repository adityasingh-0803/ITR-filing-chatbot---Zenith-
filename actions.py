from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionRecommendITRForm(Action):
    def name(self) -> Text:
        return "action_recommend_itr_form"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Get the latest intent
        latest_intent = tracker.latest_message.get('intent', {}).get('name')
        
        # Determine ITR form based on income type
        if latest_intent == "provide_income_salary":
            form = "ITR-1 (Sahaj)"
            explanation = "Based on your salary income, ITR-1 is most suitable. This form is for individuals having income from salary, one house property, and interest income."
        elif latest_intent == "provide_income_business":
            form = "ITR-3"
            explanation = "Since you have business income, ITR-3 is appropriate. This form is for individuals and HUFs having income from business or profession."
        elif latest_intent == "provide_income_rental":
            form = "ITR-2"
            explanation = "Based on your rental income, ITR-2 is recommended. This form is suitable for individuals having income from property and other sources."
        else:
            form = "ITR-1 (Sahaj)"
            explanation = "Based on the limited information, I'm suggesting ITR-1. Please provide more details about your income sources for a more accurate recommendation."

        # Send response with custom payload
        dispatcher.utter_message(
            text=f"I recommend using {form}. {explanation}",
            custom={
                "itr_recommendation": {
                    "form": form,
                    "explanation": explanation
                }
            }
        )
        return []

class ActionSuggestInvestments(Action):
    def name(self) -> Text:
        return "action_suggest_investments"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Send investment suggestions
        message = (
            "Here are some tax-saving investment options:\n\n"
            "1. PPF (Public Provident Fund)\n"
            "   - Tax deduction under Section 80C\n"
            "   - Maximum investment: ₹1,50,000 per year\n\n"
            "2. ELSS (Equity Linked Saving Scheme)\n"
            "   - Tax deduction under Section 80C\n"
            "   - Shortest lock-in period of 3 years\n\n"
            "3. NPS (National Pension System)\n"
            "   - Additional tax benefit under Section 80CCD(1B)\n"
            "   - Extra deduction up to ₹50,000"
        )
        
        dispatcher.utter_message(text=message)
        return []