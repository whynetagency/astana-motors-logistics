import {Injectable} from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged, reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut, updateEmail,
} from '@angular/fire/auth';
import { collection, collectionData, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ISignUpData, IUser } from '../models/user.model';
import { CollectionReference, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();
  userId = '';
  isAdmin = false;
  user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  usersCollection: CollectionReference<DocumentData>;

  constructor(
    private fs: Firestore,
    private router: Router
  ) {
    this.usersCollection = collection(this.fs, 'users') as unknown as CollectionReference<DocumentData>;
    onAuthStateChanged(this.auth, (user): void => {
      this.isUserLoggedIn.next(!!user);
      if (user) {
        this.userId = user.uid;
        this.getUserData();
      }
    });
  }

  signInWithEmailAndPassword(data: { email: string, password: string }): void {
    signInWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential: any) => {
        this.user.next(userCredential.user)
        this.userId = userCredential.user.uid;
        this.router.navigate(['account']).then();
      })
      .catch((error: any) => console.log(error.message));
  }

  async createUser(data: ISignUpData): Promise<void> {
    try {
      const authData = await createUserWithEmailAndPassword(this.auth, data.email, data.password);

      const userId = authData.user.uid;
      const user: IUser = {
        id: userId,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };

      const userDoc = doc(this.usersCollection, user.id);
      await setDoc(userDoc, user);

    } catch (error) {
      console.error('Error creating user:', error);
      this.router.navigate(['']).then();
      throw error;
    }
  }

  getUserData(): void {
    const userDoc = doc(this.usersCollection, this.userId);

    try {
      getDoc(userDoc).then(userData => {
        this.user.next(userData.data() as IUser);
        this.isAdmin = !!(userData.data() as IUser).isAdmin;
      })
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  getAllUsersData(): void {
    try {
      return collectionData(this.usersCollection);
    } catch (error) {
      console.error('Error fetching all users data:', error);
      throw error;
    }
  }

  async signOut() {
    signOut(this.auth).then(() => {
      this.user.next(null);
      this.userId = '';
      this.router.navigate(['login']).then();
    }).catch((error: any) => {
      console.error('Error sign out:', error);
      throw error;
    })
  }

  passwordReset(email: string) {
    try {
      return sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('Error sign in:', error);
      throw error;
    }
  }

  updateUserData(updatedData: IUser, password?: string): Promise<void> {

    // Перевірка на наявність користувача
    if (!this.auth.currentUser) {
      return Promise.reject('Користувач не авторизований');
    }

    // Якщо email змінився, спробуємо оновити його в Auth
    if (updatedData.email && updatedData.email !== this.auth.currentUser.email && password) {
      return this.updateEmailInAuth(updatedData.email, password)
        .then(() => this.updateFirestoreData(updatedData));
    }

    // Якщо email не змінюється, оновлюємо дані лише в Firestore
    return this.updateFirestoreData(updatedData);
  }

  private async updateEmailInAuth(newEmail: string, userPassword: string): Promise<void> {
      const user = this.auth.currentUser;

      if (user) {
        const credential = EmailAuthProvider.credential(user.email!, userPassword);
        reauthenticateWithCredential(user, credential)
          .then(() => {
            return updateEmail(user, newEmail);
          })
      }
  }

  private updateFirestoreData(value: IUser): Promise<void> {
    const userDoc = doc(this.usersCollection, this.userId) as unknown as DocumentReference<IUser>;
    return updateDoc(userDoc, value);
  }
}
