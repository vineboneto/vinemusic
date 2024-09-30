import { Anchor } from "@/components/anchor";
import { Button } from "@/components/form/button";
import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import { Font } from "@/constants/Font";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

export default function Index() {
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [visibleDelete, setVisibleDelete] = useState(false);

	return (
		<>
			<View
				style={{
					flex: 1,
					marginHorizontal: 20,
					rowGap: 20,
					marginTop: 20,
				}}
			>
				<Text style={{ fontFamily: Font.InterSemiBold, fontSize: 40 }}>
					Meus Dados
				</Text>

				<View>
					<Label>Nome</Label>
					<Input placeholder="Nome" />
				</View>
				<Button
					title="Atualizar Nome"
					onPress={() => {
						Toast.show({
							type: ALERT_TYPE.SUCCESS,
							title: "Sucesso",
							textBody: "Nome Atualizado com sucesso",
						});
					}}
				/>
				<Button
					title="Atualizar Senha"
					onPress={() => setVisiblePassword(true)}
				/>
				<Button
					title="Excluir Conta"
					variant="danger"
					onPress={() => setVisibleDelete(true)}
				/>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						alignItems: "center",
						marginBottom: 60,
					}}
				>
					<Pressable
						style={{
							flexDirection: "row",
							alignItems: "center",
							columnGap: 10,
						}}
					>
						<Feather
							name="log-out"
							size={20}
							style={{ transform: [{ rotate: "180deg" }] }}
						/>
						<Text style={{ fontFamily: Font.InterRegular, fontSize: 16 }}>
							Sair
						</Text>
					</Pressable>
				</View>
			</View>
			<Anchor
				height={500}
				visible={visiblePassword}
				onClose={() => setVisiblePassword(false)}
			>
				<View style={{ rowGap: 20 }}>
					<Text style={{ fontFamily: Font.InterMedium, fontSize: 20 }}>
						Alterar Minha Senha
					</Text>
					<View>
						<Label>Senha Atual</Label>
						<Input placeholder="Senha Atual" />
					</View>
					<View>
						<Label>Nova Senha</Label>
						<Input placeholder="Nova Senha" />
					</View>
					<View>
						<Label>Confirmar Senha</Label>
						<Input placeholder="Confirmar nova senha" />
					</View>
					<Button title="Alterar" onPress={() => {}} />
				</View>
			</Anchor>
			<Anchor visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
				<View>
					<Text style={{ fontFamily: Font.InterMedium, fontSize: 20 }}>
						Tem certeza que deseja excluir sua conta? Essa operação é
						irreversível!
					</Text>
					<Button
						style={{ marginTop: 40 }}
						title="Excluir"
						variant="danger"
						onPress={() => setVisibleDelete(false)}
					/>
				</View>
			</Anchor>
		</>
	);
}
